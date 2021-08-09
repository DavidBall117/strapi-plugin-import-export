import React, { memo, useEffect } from "react";
import { Select, Button, Textarea, InputText, Checkbox } from "@buffetjs/core";
import { useIntl } from "react-intl";

import MasterLayout from "../../components/MasterLayout";
import Row from "../../components/Row";
import LoadingOverlay from "../../components/LoadingOverlay";

import useHomePage from "./useHomePage";
import "./index.css";

const HomePage = () => {
  const intl = useIntl();
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

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <MasterLayout>
      {loading && <LoadingOverlay />}
      <Row>
        <Checkbox
          message={intl.formatMessage({ id: 'import-export.export.remove-strapi-properties' })}
          name="RemoveStrapiPropertiesCheckbox"
          onChange={({ target }) => onSetRemoveStrapiPropertiesChange(target.value)}
          value={removeStrapiProperties}
        />
        {/* <Checkbox
          message={intl.formatMessage({ id: 'import-export.export.remove-media-properties' })}
          name="RemoveMediaCheckbox"
          onChange={({ target }) => onSetRemoveMedia(target.value)}
          value={removeMedia}
        /> */}
      </Row>
      <Row>
        <Select
          name="SourceSelect"
          options={sources}
          value={source}
          onChange={({ target: { value } }) => setSource(value)}
        />
        <Button
          label={intl.formatMessage({ id: 'import-export.export.fetch-data' })}
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
            name="FileNameInputText"
            type="text"
            value={fileName}
            onChange={({ target: { value } }) => setFileName(value)}
          />
          <Button
            label={intl.formatMessage({ id: 'import-export.export.download-data' })}
            color="success"
            className="button"
            onClick={downloadSourceData}
          />
        </Row>
      )}
      {dataString !== '' && (
        <Row>
          <Textarea
            name="DataStringTextarea"
            className="textarea"
            disabled={true}
            value={dataString}
          />
        </Row>
      )}
    </MasterLayout>
  );
};

export default memo(HomePage);
