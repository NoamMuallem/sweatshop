import * as React from "react";

export interface DashBoardProps {
  // loadInventory:()=>void;
  // selectInventory:()=>void;
}

export interface DashBoardState {}

class DashBoard extends React.Component<DashBoardProps, DashBoardState> {
  render() {
    return <div>this is dash board</div>;
  }
}

export default DashBoard;
