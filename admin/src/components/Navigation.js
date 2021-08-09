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
