import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";

import pluginId from "../../pluginId";

import HomePage from "../HomePage";
import ImportPage from "../ImportPage";

const App = () => {
  return (
      <Switch>
        <Route
          path={`/plugins/${pluginId}`}
          component={HomePage}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/import`}
          component={ImportPage}
          exact
        />
        <Route
          component={NotFound}
        />
      </Switch>
  );
};

export default App;
