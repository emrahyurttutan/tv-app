import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import gravatar from "gravatar";
import { NavLink } from "react-router-dom";

export default class InlineProfile extends Component {
  static propTypes = {
    isUserProfile: PropTypes.bool,
    userInfo: PropTypes.object,
    showUserProfile: PropTypes.func,
    hideUserProfile: PropTypes.func,
    authLogout: PropTypes.func,
  };
  onToggleProfile = () => {
    const { isUserProfile } = this.props;
    const { hideUserProfile, showUserProfile } = this.props;
    if (isUserProfile) {
      hideUserProfile();
    } else {
      showUserProfile();
    }
  };

  render() {
    const { userInfo, isUserProfile } = this.props;
    var secureUrl = gravatar.url(userInfo.email, { s: "56" }, true);

    return (
      <div className="profile">
        <div>
          <img src={secureUrl} alt={userInfo.name} />
        </div>
        <button className="p-link profile-link" onClick={this.onToggleProfile}>
          {userInfo.name && <span className="username">{userInfo.name}</span>}
          <i className="pi pi-fw pi-cog" />
        </button>
        <ul
          className={classNames({
            "profile-expanded": isUserProfile,
          })}
        >
          <li>
            <NavLink
              className="p-link"
              activeClassName="active-route"
              to={"/profile"}
              exact
            >
              <i className="pi pi-fw pi-user" />
              <span>Hesabım</span>
            </NavLink>
          </li>
          <li>
            <button className="p-link" onClick={() => this.props.authLogout()}>
              <i className="pi pi-fw pi-power-off" />
              <span>Çıkış Yap</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
