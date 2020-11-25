import React, { memo, Component } from "react";
import { request } from "strapi-helper-plugin";
import { Select, Button, Textarea, InputText } from "@buffetjs/core";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";

import "./index.css";

class HomePage extends Component {
  state = {
    loading: false,
    exportSources: [{ label: "All Data", value: "all" }],
    exportSource: "all",
    fileName: "import-export.json",
    data: "",
  };

  async componentDidMount() {
    try {
      const response = await request("/content-type-builder/content-types", {
        method: "GET",
      });
      const exportSources = [];
      for (let i = 0; i < response.data.length; i++) {
        if (
          response.data[i].plugin &&
          (response.data[i].plugin === "admin" ||
            response.data[i].plugin === "users-permissions" ||
            response.data[i].plugin === "upload")
        ) {
          continue;
        }
        exportSources.push({
          label: response.data[i].apiID,
          value: response.data[i].apiID,
        });
      }
      this.setState((prevState) => ({
        exportSources: prevState.exportSources.concat(exportSources),
      }));
    } catch (err) {
      console.log(err);
      strapi.notification.toggle({ type: "error", message: `${err}` });
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const response = await request(
        `/import-export/raw-data?source=${this.state.exportSource}`,
        {
          method: "GET",
        }
      );
      this.setState({ data: JSON.stringify(response, null, 2) });
    } catch (err) {
      console.log(err);
      strapi.notification.toggle({ type: "error", message: `${err}` });
    }
    this.setState({ loading: false });
  };

  downloadData = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.data], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${this.state.fileName}`;
    document.body.appendChild(element); // Required for Firefox
    element.click();
  };

  render() {
    const { loading, exportSources, exportSource, fileName, data } = this.state;
    return (
      <MasterLayout>
        {loading && <LoadingOverlay />}

        <Row>
          <Select
            name="exportSource"
            options={exportSources}
            value={exportSource}
            onChange={({ target: { value } }) =>
              this.setState({ exportSource: value })
            }
          />
          <Button
            color="primary"
            label="Preview Data"
            style={{ minWidth: 200, marginLeft: "2rem" }}
            onClick={this.fetchData}
          />
        </Row>

        {data !== "" && (
          <Row>
            <InputText
              name="FileName"
              onChange={({ target: { value } }) => {
                this.setState({ fileName: value });
              }}
              placeholder="Enter file name..."
              type="text"
              value={fileName}
            />
            <Button
              color="success"
              label="Download Data"
              style={{ minWidth: 200, marginLeft: "2rem" }}
              onClick={this.downloadData}
            />
          </Row>
        )}

        {data !== "" && (
          <Row>
            <Textarea
              name="DataPreview"
              value={data}
              disabled={true}
              style={{
                height: 600,
              }}
            />
          </Row>
        )}
      </MasterLayout>
    );
  }
}

export default memo(HomePage);
