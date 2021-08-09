import React, { memo } from "react";
import { Button, Textarea } from "@buffetjs/core";
import { useIntl } from "react-intl";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";

import UploadIcon from "../../assets/upload.png";

import useImportPage from "./useImportPage";
import "./index.css";

const ImportPage = () => {
  const intl = useIntl();
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
              {intl.formatMessage({ id: 'import-export.import.message' })}
            </p>
          )}
          <input
            id="FileInput"
            type="file"
            accept=".json"
            className="file-input"
            onChange={onFileChange}
          />
          <label htmlFor="FileInput" className="file-input-label">
            {intl.formatMessage({ id: 'import-export.import.choose-file' })}
          </label>
        </div>
      </Row>
      <Row>
        <Button
          label={intl.formatMessage({ id: 'import-export.import.load-file' })}
          color="primary"
          className="import-button"
          disabled={!file}
          onClick={loadFile}
        />
        <Button
          label={intl.formatMessage({ id: 'import-export.import.upload-file' })}
          color="success"
          className="import-button"
          disabled={!data}
          onClick={uploadFile}
        />
      </Row>
      <Row>
        <Textarea
          name="FilePreviewTextarea"
          className="import-textarea"
          disabled={true}
          value={data}
        />
      </Row>
    </MasterLayout>
  );
}

export default memo(ImportPage);
