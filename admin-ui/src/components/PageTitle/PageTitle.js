import React from "react";
import PropTypes from "prop-types";
export default class PageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
  static defaultProps = {
    title: ""
  };
  componentDidMount() {
    this.setHeader();
  }
  componentDidUpdate() {
    this.setHeader();
  }
  setHeader() {
    const { title } = this.props;
    document.title = title;
  }
  render() {
    return this.props.children;
  }
}
