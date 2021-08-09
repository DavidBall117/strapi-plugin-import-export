import React, { memo } from "react";
import pluginId from "../pluginId";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";

const getUrl = (to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

const Navigation = () => {
  return (
    <>
      <PluginHeader
        title={"Import/Export"}
        description={"Import & export single types and collection types."}
      />
      <HeaderNav
        links={[
          {
            name: "Export Data",
            to: getUrl(""),
          },
          {
            name: "Import Data",
            to: getUrl("import"),
          },
        ]}
      />
    </>
  );
};

export default memo(Navigation);
