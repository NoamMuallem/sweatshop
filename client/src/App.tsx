import React from "react";
import "./App.css";
//pages
import TamplateCollection from "./components/tamplates-gallery/tamplates-collection";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  return (
    <div>
      <TamplateCollection />
    </div>
  );
};

export default App;
