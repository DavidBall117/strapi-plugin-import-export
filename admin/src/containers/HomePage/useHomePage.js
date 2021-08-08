import { useState } from "react";
import { request } from "strapi-helper-plugin";

export default () => {
    const getDefaultFileName = (sourceName) => {
        const name = 'import-export';
        const ext = '.json';
        return sourceName ? `${name}-${sourceName.toLocaleLowerCase()}${ext}` : `${name}${ext}`;
    };

    const [loading, setLoading] = useState(false);
    const [sources, setSources] = useState([{ label: 'all', value: 'all' }]);
    const [source, setSource] = useState('all');
    const [fileName, setFileName] = useState(getDefaultFileName());
    const [dataString, setDataString] = useState('');

    const excludedSources = [
        'admin',
        'users-permissions',
        'upload',
        'i18n'
    ];

    const validSource = (fetchedSource) => {
        return !excludedSources.includes(fetchedSource);
    };

    const fetchSources = async () => {
        try {
            const response = await request("/content-type-builder/content-types", {
                method: 'GET',
            });
            const fetchedSources = [];
            for (let i = 0; i < response.data.length; i++) {
                if (validSource(response.data[i].plugin)) {
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
            const response = await request(
                `/import-export/raw-data?source=${source}`,
                { method: 'GET' }
            );
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
        // Required for Firefox
        document.body.appendChild(element);
        element.click();
    };

    return {
        getDefaultFileName,
        loading,
        sources,
        source,
        setSource,
        fileName,
        setFileName,
        dataString,
        fetchSources,
        fetchSourceData,
        downloadSourceData
    };
};
