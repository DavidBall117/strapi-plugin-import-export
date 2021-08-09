import React, { memo } from "react";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";
import { useIntl } from "react-intl";
import pluginId from "../pluginId";

const Navigation = () => {
  const intl = useIntl();
  return (
    <>
      <PluginHeader
        title={intl.formatMessage({ id: 'import-export.app.title' })}
        description={intl.formatMessage({ id: 'import-export.app.description' })}
        actions={[
          {
            label: 'import-export.app.action.single-type-button',
            primary: true,
            onClick: () => alert(`${intl.formatMessage({ id: 'import-export.app.action.single-type-info' })}`)
          }
        ]}
      />
      <HeaderNav
        links={[
          {
            name: intl.formatMessage({ id: 'import-export.link.export' }),
            to: `/plugins/${pluginId}`
          },
          {
            name: intl.formatMessage({ id: 'import-export.link.import' }),
            to: `/plugins/${pluginId}/import`
          }
        ]}
      />
    </>
  );
};

export default memo(Navigation);
