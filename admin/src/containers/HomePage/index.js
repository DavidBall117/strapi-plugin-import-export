import React, { memo, useEffect } from "react";
import { Select, Button, Textarea, InputText, Checkbox } from "@buffetjs/core";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";

import useHomePage from "./useHomePage";
import "./index.css";

const HomePage = () => {
  const {
    getDefaultFileName,
    loading,
    removeStrapiProperties,
    removeMedia,
    sources,
    source,
    setSource,
    fileName,
    setFileName,
    dataString,
    onSetRemoveStrapiPropertiesChange,
    onSetRemoveMedia,
    fetchSources,
    fetchSourceData,
    downloadSourceData
  } = useHomePage();

  useEffect(fetchSources, []);

  return (
    <MasterLayout>
      {loading && <LoadingOverlay />}
      <Row>
        <Checkbox
          message="Remove Strapi Properties"
          onChange={({ target }) => onSetRemoveStrapiPropertiesChange(target.value)}
          value={removeStrapiProperties}
        />
        <Checkbox
          message="Remove Media (images, videos, files)"
          onChange={({ target }) => onSetRemoveMedia(target.value)}
          value={removeMedia}
        />
      </Row>
      <Row>
        <Select
          options={sources}
          value={source}
          onChange={({ target: { value } }) => setSource(value)}
        />
        <Button
          label="Fetch Data"
          color="primary"
          className="button"
          onClick={() => {
            fetchSourceData();
            setFileName(getDefaultFileName(source));
          }}
        />
      </Row>
      {dataString !== '' && (
        <Row>
          <InputText
            type="text"
            value={fileName}
            onChange={({ target: { value } }) => setFileName(value)}
          />
          <Button
            label="Download Data"
            color="success"
            className="button"
            onClick={downloadSourceData}
          />
        </Row>
      )}
      {dataString !== '' && (
        <Row>
          <Textarea
            className="text-area"
            disabled={true}
            value={dataString}
          />
        </Row>
      )}
    </MasterLayout>
  );
};

export default memo(HomePage);
