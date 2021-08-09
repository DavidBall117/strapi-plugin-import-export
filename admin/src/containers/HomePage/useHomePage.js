import { useState } from "react";
import { request } from "strapi-helper-plugin";

const excludedSources = [
  'admin',
  'users-permissions',
  'upload',
  'i18n'
];

const strapiProperties = [
  'id',
  'published_at',
  'created_at',
  'updated_at',
  'created_by',
  'updated_by'
];

const mediaProperties = [
  'name',
  'alternativeText',
  'caption',
  'width',
  'height',
  'formats',
  'hash',
  'ext',
  'mime',
  'size',
  'url',
  'previewUrl',
  'provider',
  'provider_metadata'
];

export default () => {
  const getDefaultFileName = (sourceName) => {
    const name = 'import-export';
    const ext = '.json';
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return sourceName ? `${name}-${sourceName}_${date}${ext}` : `${name}_${date}${ext}`;
  };

  const [loading, setLoading] = useState(false);
  const [removeStrapiProperties, setRemoveStrapiProperties] = useState(true);
  const [removeMedia, setRemoveMedia] = useState(false);
  const [sources, setSources] = useState([{ label: 'all', value: 'all' }]);
  const [source, setSource] = useState('all');
  const [fileName, setFileName] = useState(getDefaultFileName());
  const [data, setData] = useState([]);
  const [dataString, setDataString] = useState('');

  const cleanStrapiProperties = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        cleanStrapiProperties(item);
      });
    } else if (obj && typeof obj === 'object') {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (strapiProperties.indexOf(key) !== -1) {
          delete obj[key];
        } else {
          cleanStrapiProperties(obj[key]);
        }
      });
    }
  };

  const cleanMedia = (obj) => {
    // TODO
  };

  const onSetRemoveStrapiPropertiesChange = (bool) => {
    setRemoveStrapiProperties(bool);
    if (data.length > 0) {
      const dataCopy = JSON.parse(JSON.stringify(data));
      if (bool) {
        cleanStrapiProperties(dataCopy);
      }
      if (removeMedia) {
        cleanMedia(dataCopy);
      }
      setDataString(JSON.stringify(dataCopy, null, 2));
    }
  };

  const onSetRemoveMedia = (bool) => {
    setRemoveMedia(bool);
    if (data.length > 0) {
      const dataCopy = JSON.parse(JSON.stringify(data));
      if (bool) {
        cleanMedia(dataCopy);
      }
      if (removeStrapiProperties) {
        cleanStrapiProperties(dataCopy);
      }
      setDataString(JSON.stringify(dataCopy, null, 2));
    }
  };

  const isValidSource = (fetchedSource) => {
    return !excludedSources.includes(fetchedSource);
  };

  const fetchSources = async () => {
    try {
      const response = await request('/content-type-builder/content-types', { method: 'GET' });
      const fetchedSources = [];
      for (let i = 0; i < response.data.length; i++) {
        if (isValidSource(response.data[i].plugin)) {
          fetchedSources.push({
            label: response.data[i].apiID,
            value: response.data[i].apiID,
          });
        }
      }
      setSources(prevState => prevState.concat(fetchedSources));
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: 'An error occured while fetching data sources.'
      });
    }
  };

  const fetchSourceData = async () => {
    setLoading(true);
    try {
      const response = await request(`/import-export/raw-data?source=${source}`, { method: 'GET' });
      setData(JSON.parse(JSON.stringify(response)));
      if (removeStrapiProperties) {
        cleanStrapiProperties(response);
      }
      if (removeMedia) {
        cleanMedia(response);
      }
      setDataString(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
      strapi.notification.toggle({
        type: 'warning',
        message: 'An error occured while fetching source data.'
      });
    }
    setLoading(false);
  };

  const downloadSourceData = () => {
    const element = document.createElement('a');
    const file = new Blob([dataString], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for Firefox
    element.click();
  };

  return {
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
  };
};
