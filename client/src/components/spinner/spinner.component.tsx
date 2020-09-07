//basic imports
import React from "react";
//components
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
//redux
import { connect } from "react-redux";
//reselect and selectors
import { createStructuredSelector } from "reselect";
import { selectLoading } from "../../redux/selectores/ui.selector";

interface Props {
  loading: boolean;
}

const MySpinner: React.FC<Props> = ({ loading }) => {
  const override = css`
    position: fixed;
    top: 35%;
    left: 50%;
    margin-left: -40px;
    display: block;z
    border-color: red;
  `;

  return <HashLoader css={override} loading={loading} />;
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
});

export default connect(mapStateToProps)(MySpinner);
