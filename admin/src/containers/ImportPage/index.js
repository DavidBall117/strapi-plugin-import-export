import React, { memo, Component } from "react";
import { Button, Textarea } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";
import UploadIcon from "../../assets/upload.png";

import "./index.css";

class ImportPage extends Component {
  state = {
    file: null,
    fileName: "",
    type: null,
    isDragging: false,
    data: "",
    loading: false,
  };

  onChangeImportFile = (file) => {
    file &&
      this.setState({
        file,
        fileName: file.name,
        type: file.type,
      });
  };

  handleDragEnter = () => {
    this.setState({ isDragging: true });
  };
  handleDragLeave = () => {
    this.setState({ isDragging: false });
  };
  handleDrop = (event) => {
    event.preventDefault();
    this.setState({ isDragging: false });
    const file = event.dataTransfer.files[0];
    this.onChangeImportFile(file);
  };

  readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  previewUploadFile = async () => {
    const { file } = this.state;
    const data = file && (await this.readFileContent(file));
    this.setState({ data });
  };

  uploadFile = async () => {
    this.setState({ loading: true });
    const { data } = this.state;
    try {
      const parsedData = JSON.parse(data);
      const response = await request(`/import-export/raw-data`, {
        method: "POST",
        body: parsedData,
      });
      if (response.success)
        strapi.notification.toggle({
          type: "success",
          message: "Upload successful.",
        });
      else
        strapi.notification.toggle({
          type: "error",
          message: "Upload failed.",
        });
    } catch (err) {
      console.log(err);
      strapi.notification.toggle({ type: "error", message: `${err}` });
    }
    this.setState({ loading: false });
  };

  render() {
    const { isDragging, file, data, loading } = this.state;
    return (
      <MasterLayout>
        {loading && <LoadingOverlay />}

        <Row>
          <div
            className={isDragging ? "isDragging" : ""}
            onDrop={this.handleDrop}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={UploadIcon}
              alt=""
              style={{
                maxWidth: "20rem",
                margin: "3rem",
              }}
            />
            <p>
              Drag &amp; drop your file into this area or choose which file to
              upload.
            </p>
            <input
              name="FileInput"
              onChange={({ target: { files } }) =>
                files && this.onChangeImportFile(files[0])
              }
              type="file"
              accept=".json"
            />
          </div>
        </Row>

        <Row>
          <Button
            label="Preview File"
            color="primary"
            disabled={!file}
            onClick={this.previewUploadFile}
            style={{
              width: 200,
            }}
          />
          <Button
            label="Upload File"
            color="success"
            disabled={!data}
            onClick={this.uploadFile}
            style={{
              width: 200,
            }}
          />
        </Row>

        <Row>
          <Textarea
            name="FilePreviewText"
            value={data}
            onChange={({ target: { value } }) => this.setState({ data: value })}
            style={{
              height: 600,
            }}
          />
        </Row>
      </MasterLayout>
    );
  }
}

export default memo(ImportPage);
