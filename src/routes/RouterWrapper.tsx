import React, { FC, memo, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Loader from "components/Loader/Loader";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import store from "redux/store";
import { RouteItem } from "types/routes.types";

import { ROOT_ROUTE, ROUTE_LIST, AUTH_ROUTE } from "./routes.config";

const NotFoundScreen: FC = () => {
  return <div>Not found</div>;
};

const routeWrapperFunc = ({
  id,
  path,
  component: Component,
  layout,
  isPrivateRoute,
  isAuthRoute,
  isAdminRoute,
}: RouteItem) => {
  const RouteLayout: FC = layout || AdminLayout;

  return (
    <Route
      exact
      key={id}
      path={path}
      render={(props): React.ReactNode => {
        const isSignedIn = !!store.getState().auth.userInfo;
        const isAdminUser = !!store.getState().auth.userInfo?.isAdminUser;

        if (isAuthRoute && isSignedIn) {
          return <Redirect key="ROOT_ROUTE" to={ROOT_ROUTE} />;
        }

        if (isAdminRoute && !isAdminUser) {
          return <Redirect key="ROOT_ROUTE" to={ROOT_ROUTE} />;
        }

        if (isPrivateRoute && !isSignedIn) {
          return <Redirect key="AUTH_ROUTE" to={AUTH_ROUTE} />;
        }

        const Content = memo((): JSX.Element => {
          return (
            <RouteLayout>
              <Component {...props} />
            </RouteLayout>
          );
        });

        return <Content />;
      }}
    />
  );
};

const RouterWrapper: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {ROUTE_LIST.map(route => routeWrapperFunc(route))}
        <Route path="*" render={() => <NotFoundScreen />} />
      </Switch>
    </Suspense>
  );
};

export default memo(RouterWrapper);
