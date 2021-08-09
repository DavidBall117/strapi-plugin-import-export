import { useState } from "react";
import { request } from "strapi-helper-plugin";

export default () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState('');

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const loadFile = async () => {
    try {
      if (file) {
        const fileContent = await readFileContent(file);
        setData(fileContent);
      }
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: 'An error occured while trying to read the input file.'
      });
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    try {
      const parsedData = JSON.parse(data);
      const response = await request('/import-export/raw-data', {
        method: 'POST',
        body: parsedData
      });
      if (response.success) {
        strapi.notification.toggle({
          type: 'success',
          message: 'Upload successful.'
        });
      } else {
        strapi.notification.toggle({
          type: 'warning',
          message: `An error occured while saving data file to database.
                        ${response.message ? `Error Message: ${response.message}` : ''}`
        });
      }
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: 'An error occured while submitting data to endpoint.'
      });
    }
    setLoading(false);
  };

  return {
    loading,
    file,
    isDragging,
    data,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragOver,
    onFileChange,
    loadFile,
    uploadFile
  };
};
