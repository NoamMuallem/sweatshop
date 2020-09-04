import React from "react";
import "./App.css";
//pages
import TamplateCollection from "./components/tamplates-gallery/tamplates-collection";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <TamplateCollection />
      </div>
    );
  }
}

export default App;
