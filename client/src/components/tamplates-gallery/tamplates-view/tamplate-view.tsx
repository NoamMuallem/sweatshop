import React, { Component, Fragment } from "react";
import mergeImages from "merge-images-v2";
import background from "../../../assets/images/black_background.jpg";

export interface TamplateMashProps {
  imageBuffer: string;
}

export interface TamplateMashState {
  src: string;
  err: string;
}

class TamplateMash extends React.Component<
  TamplateMashProps,
  TamplateMashState
> {
  constructor(props: TamplateMashProps) {
    super(props);
    this.state = { src: "", err: "" };
  }

  componentDidMount = () => {
    mergeImages([background, this.props.imageBuffer!])
      .then((src: string) => this.setState({ src }))
      .catch((err: any) => this.setState({ err: err.toString() }));
  };

  render() {
    return (
      <Fragment>
        <img width="250" height="250" src={this.state.src} alt="" />
        {this.state.err && <p>{this.state.err} </p>}
      </Fragment>
    );
  }
}

export default TamplateMash;
