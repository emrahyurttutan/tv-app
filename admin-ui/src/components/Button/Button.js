import React, { Component } from "react";
import LinkItem from "../../utils/LinkItem";
import PropTypes from "prop-types";
import { Button } from "primereact/button";

export default class CustomButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.object
  };
  static defaultProps = {
    type: "",
    children: null,
    icon: null
  };
  render() {
    const { title, icon, url, type, className, children } = this.props;
    const buttonType = type ? type : null;
    return url ? (
      <LinkItem
        type={6}
        onClick={() => this.props.onClick && this.props.onClick()}
        className={["general-button", className, type]
          .filter(e => !!e)
          .join(" ")}
        url={url}
      >
        <Button {...this.props} />
      </LinkItem>
    ) : (
      <div
        className={["general-button", className, type]
          .filter(e => !!e)
          .join(" ")}
      >
        <button
          type={buttonType}
          onClick={() => this.props.onClick && this.props.onClick()}
        >
          {children && children}
          {icon && <i className={icon} />}
          {title}
        </button>
      </div>
    );
  }
}
