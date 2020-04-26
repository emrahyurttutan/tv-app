import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
export default class Menu extends Component {
  static defaultProps = {
    model: null,
    onMenuItemClick: null,
    activeItem: null
  };

  static propTypes = {
    model: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    activeItem: PropTypes.number
  };

  render() {
    return (
      <div className="menu">
        <MenuItem
          items={this.props.model}
          activeIndex={this.props.activeItem}
          menuActiveItemChange={this.props.menuActiveItemChange}
          className="layout-main-menu"
          onMenuItemClick={this.props.onMenuItemClick}
          root={true}
        />
      </div>
    );
  }
}
