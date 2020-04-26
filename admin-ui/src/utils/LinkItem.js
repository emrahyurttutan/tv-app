import React, { Component } from "react";
import { Link } from "react-router-dom";
import { linkItem } from "../config";
import PropTypes from "prop-types";

export default class LinkItem extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    url: "",
    type: 1,
    onClick: () => {
      window.scrollTo(0, 0);
    },
    className: "",
    style: {}
  };

  createLink = (type, url) => {
    const currentLinkType = linkItem.filter(item => item.type === type)[0];
    if (currentLinkType && currentLinkType.path) {
      url = url ? url : "";
      return {
        pathname: currentLinkType.path + url
      };
    }

    return {
      pathname: url
    };
  };

  render() {
    const {
      type,
      url,
      referenceId,
      target,
      children,
      className,
      style
    } = this.props;
    const to = this.createLink(type, url ? url : referenceId);
    if (type === 4 || type === 5) {
      return (
        <a
          onClick={() => this.props.onClick()}
          href={url}
          target={target}
          rel="noopener noreferrer"
          className={className}
          style={style}
        >
          {children}
        </a>
      );
    } else if (type === 3) {
      return (
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            this.props.onClick();
          }}
          className={className}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        onClick={() => this.props.onClick()}
        target={target}
        to={to}
        className={className}
        style={style}
      >
        {children}
      </Link>
    );
  }
}
