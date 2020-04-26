import React, { Component } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import PropTypes from "prop-types";
export default class Loading extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    fill: PropTypes.string,
    strokeWidth: PropTypes.string,
    animationDuration: PropTypes.string
  };
  static defaultProps = {
    style: null,
    className: null,
    fill: "#fff",
    strokeWidth: "8",
    animationDuration: ".5s"
  };
  render() {
    const { show } = this.props;
    return show ? <ProgressSpinner {...this.props} /> : null;
  }
}
