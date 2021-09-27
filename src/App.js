import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { ColumnsWithTasks } from "./containers";

const App = () => {
  return (
    <Router>
      <Switch>
        <ColumnsWithTasks />;
      </Switch>
    </Router>
  );
};

export default App;
