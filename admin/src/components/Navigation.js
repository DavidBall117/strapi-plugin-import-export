import React, { memo } from "react";
import pluginId from "../pluginId";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";

const Navigation = () => {
  return (
    <>
      <PluginHeader
        title={'Import/Export'}
        description={'Import & export single types and collection types.'}
      />
      <HeaderNav
        links={[
          {
            name: 'Export Data',
            to: `/plugins/${pluginId}`,
          },
          {
            name: 'Import Data',
            to: `/plugins/${pluginId}/import`,
          },
        ]}
      />
    </>
  );
};

export default memo(Navigation);
