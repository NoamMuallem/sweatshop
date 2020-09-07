//a component that base on screen resolution will output
//a gallery of tamplates
//will get throw props what to do when a tamplate was clicked

import * as React from "react";
import { TamplateI } from "../../types/interfaces";
import { connect } from "react-redux";
import {
  getTamplates,
  uploadNewTamplate,
  updateTamplate,
  deleteTamplate,
} from "../../redux/actions/tamplates.actions";
import { createStructuredSelector } from "reselect";
import { selectTamplates } from "../../redux/selectores/tamplates.selector";
import DesktopView from "./tamplates-view/desktop.component";
import MobileView from "./tamplates-view/mobile.component";
import { selectToken } from "../../redux/selectores/auth.selector";

export interface TamplatesGalleryProps {
  getTamplatesFromServer: () => void;
  tamplates: { [key: string]: TamplateI };
  newTamplate: (tamplate: TamplateI, image: File) => void;
  updateTamp: (tamplate: TamplateI, image: File) => void;
  delete: (tamplate: TamplateI) => void;
  token: string | null;
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
    if (Object.keys(this.props.tamplates).length === 0) {
      this.props.getTamplatesFromServer();
    }
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
      <DesktopView
        tamplates={this.props.tamplates}
        {...(this.props.token
          ? {
              addTamplate: this.props.newTamplate,
              update: this.props.updateTamp,
              delete: this.props.delete,
            }
          : {})}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getTamplatesFromServer: () => dispatch(getTamplates()),
  newTamplate: (tamplate: TamplateI, image: File) =>
    dispatch(uploadNewTamplate(tamplate, image)),
  updateTamp: (tamplate: TamplateI, image: File) =>
    dispatch(updateTamplate(tamplate, image)),
  delete: (tamplate: TamplateI) => dispatch(deleteTamplate(tamplate)),
});

const mapStateToProps = createStructuredSelector({
  tamplates: selectTamplates,
  token: selectToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(TamplatesGallery);
