import React from "react";
import "./App.css";
//pages
import TamplateCollection from "./components/tamplates-gallery/tamplates-collection";
import Dashboard from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login.page";
//router
import { Route } from "react-router-dom";
//components
import MySpinner from "./components/spinner/spinner.component";
//HOC
import ProtectedRoute from "./components/HOC/auth.component";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  //TODO:when implementing navbar, add log out if logged in
  return (
    <div>
      <MySpinner />
      <Route path="/" exact render={() => <TamplateCollection />} />
      <Route path="/admin" exact render={() => <LoginPage />} />
      <Route
        path="/dash"
        exact
        render={() => <ProtectedRoute Component={<Dashboard />} />}
      />
    </div>
  );
};

export default App;
