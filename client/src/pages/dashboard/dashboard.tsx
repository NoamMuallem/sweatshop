import * as React from "react";
import { Component } from "react";

export interface DashBoardProps {
  // loadInventory:()=>void;
  // selectInventory:()=>void;
}

export interface DashBoardState {}

class DashBoard extends React.Component<DashBoardProps, DashBoardState> {
  constructor(props: DashBoardProps) {
    super(props);
    // this.state = { :  };
  }
  render() {
    return <div>test</div>;
  }
}

export default DashBoard;
