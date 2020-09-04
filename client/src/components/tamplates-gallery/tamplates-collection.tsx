//a component that base on screen resolution will output
//a gallery of tamplates
//will get throw props what to do when a tamplate was clicked

import * as React from "react";
import { Component } from "react";
import { TamplateI } from "../../types/interfaces";
import { isRegExp } from "util";
import { connect } from "react-redux";
import { getTamplates } from "../../redux/actions/tamplates.actions";
import { createStructuredSelector } from "reselect";
import { selectTamplates } from "../../redux/selectores/tamplates.selector";
import DesktopView from "./tamplates-view/desktop.component";
import MobileView from "./tamplates-view/mobile.component";

export interface TamplatesGalleryProps {
  getTamplatesFromServer: () => void;
  tamplates: { [key: string]: TamplateI };
  // onClick:()=>void;
}

export interface TamplatesGalleryState {
  isMobile: boolean;
}

class TamplatesGallery extends React.Component<
  TamplatesGalleryProps,
  TamplatesGalleryState
> {
  constructor(props: TamplatesGalleryProps) {
    super(props);
    this.state = { isMobile: true };
  }

  componentDidMount = () => {
    this.props.getTamplatesFromServer();
  };

  render() {
    const mql = window.matchMedia("(min-width: 800px)");

    let mobileView = mql.matches;

    mql.addEventListener("change", (e) => {
      mobileView = e.matches;
      if (mobileView) {
        this.setState({ isMobile: true });
      } else {
        this.setState({ isMobile: false });
      }
    });
    return !this.state.isMobile ? (
      <MobileView tamplates={this.props.tamplates} />
    ) : (
      <DesktopView tamplates={this.props.tamplates} />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getTamplatesFromServer: () => dispatch(getTamplates()),
});

const mapStateToProps = createStructuredSelector({
  tamplates: selectTamplates,
});

export default connect(mapStateToProps, mapDispatchToProps)(TamplatesGallery);