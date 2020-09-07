import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsAuthenticated } from "../../redux/selectores/auth.selector";
import React from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean | null;
  Component: JSX.Element;
}

const ProtectedRoute = ({
  Component,
  isAuthenticated,
}: ProtectedRouteProps) => {
  return <>{isAuthenticated ? Component : <div>נא להתחבר</div>}</>;
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
