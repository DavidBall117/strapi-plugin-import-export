import { useState } from "react";
import { request } from "strapi-helper-plugin";
import { useIntl } from "react-intl";

export default () => {
  const intl = useIntl();

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
        message: intl.formatMessage({ id: 'import-export.notification.warning.file' })
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
          message: intl.formatMessage({ id: 'import-export.notification.success.save' })
        });
      } else {
        strapi.notification.toggle({
          type: 'warning',
          message: `${intl.formatMessage({ id: 'import-export.notification.warning.save' })}
            ${intl.formatMessage({ id: 'import-export.notification.warning.error' })}${response.message}`
        });
      }
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: intl.formatMessage({ id: 'import-export.notification.warning.upload' })
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
