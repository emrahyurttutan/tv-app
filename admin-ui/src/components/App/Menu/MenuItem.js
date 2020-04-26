import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class MenuItem extends Component {
  static defaultProps = {
    className: null,
    items: null,
    onMenuItemClick: null,
    root: false,
    activeIndex: null
  };

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    root: PropTypes.bool,
    activeIndex: PropTypes.number
  };

  onMenuItemClick = (event, item, index) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }

    if (item.children && item.children.length > 0) {
      if (index === this.props.activeIndex) {
        this.props.menuActiveItemChange(null);
      } else {
        this.props.menuActiveItemChange(index);
      }
      if (this.props.onMenuItemClick) {
        this.props.onMenuItemClick({
          originalEvent: event,
          item: item
        });
      }
    }
  };

  renderLinkContent(item) {
    let submenuIcon = item.children && item.children.length > 0 && (
      <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />
    );
    let badge = item.badge && (
      <span className="menuitem-badge">{item.badge}</span>
    );

    return (
      <>
        <i className={item.icon} />
        <span>{item.text}</span>
        {submenuIcon}
        {badge}
      </>
    );
  }

  renderLink(item, i) {
    let content = this.renderLinkContent(item);

    if (item.url) {
      return (
        <NavLink
          activeClassName="active-route"
          to={item.url}
          onClick={e => this.onMenuItemClick(e, item, i)}
          exact
          target={item.target}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        /* eslint-disable-next-line */
        <a onClick={e => this.onMenuItemClick(e, item, i)} target={item.target}>
          {content}
        </a>
      );
    }
  }

  render() {
    let items =
      this.props.items &&
      this.props.items.map((item, i) => {
        let active = this.props.activeIndex === i;
        let styleClass = classNames(item.badgeStyleClass, {
          "active-menuitem": active && !item.url
        });

        return (
          <li className={styleClass} key={i}>
            {item.items && this.props.root === true && (
              <div className="arrow" />
            )}
            {this.renderLink(item, i)}
            <MenuItem
              items={item.children}
              onMenuItemClick={this.props.onMenuItemClick}
            />
          </li>
        );
      });

    return items ? <ul className={this.props.className}>{items}</ul> : null;
  }
}
