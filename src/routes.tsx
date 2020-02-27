import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Root from "./components/layout/Root";
import Header from "./components/layout/Header";
import IndexPage from "./pages/index";

const notFound: any = () => {
  return <div>not found</div>;
};

const Routes: React.SFC = () => (
  <Root>
    <Header title="Calendar App" />
    <Switch>
      <Route exact={true} path="/" component={IndexPage} />
      <Route component={notFound} />
    </Switch>
  </Root>
);

export default Routes;
