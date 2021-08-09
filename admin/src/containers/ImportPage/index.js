import React, { memo } from "react";
import { Button, Textarea } from "@buffetjs/core";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";

import UploadIcon from "../../assets/upload.png";

import useImportPage from "./useImportPage";
import "./index.css";

const ImportPage = () => {
  const {
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
  } = useImportPage();

  return (
    <MasterLayout>
      {loading && <LoadingOverlay />}
      <Row>
        <div
          className={`drag-container${isDragging ? ' is-dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            alt="Upload Icon"
            className="upload-icon"
            src={UploadIcon}
          />
          {file ? (
            <p>
              {file.name}
            </p>
          ) : (
            <p>
              Drag and drop your file into this area or choose which file to upload.
            </p>
          )}
          <input
            name="FileInput"
            type="file"
            accept=".json"
            onChange={onFileChange}
          />
        </div>
      </Row>
      <Row>
        <Button
          label="Load File"
          color="primary"
          className="button"
          disabled={!file}
          onClick={loadFile}
        />
        <Button
          label="Upload File"
          color="success"
          className="button"
          disabled={!data}
          onClick={uploadFile}
        />
      </Row>
      <Row>
        <Textarea
          name="FilePreviewTextarea"
          className="preview-textarea"
          disabled={true}
          value={data}
        />
      </Row>
    </MasterLayout>
  );
}

export default memo(ImportPage);
