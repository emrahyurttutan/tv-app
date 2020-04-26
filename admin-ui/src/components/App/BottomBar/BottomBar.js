import React, { Component } from "react";

export default class BottomBar extends Component {
  render() {
    return (
      <div className="layout-footer">
        <span className="footer-text" style={{ marginRight: "5px" }}>
          2019
        </span>
        <img
          src="//yurttutan.net/public/files/images/logo2.png"
          alt="logo"
          width="80"
        />
        <span className="footer-text" style={{ marginLeft: "5px" }}>
          Tüm hakları saklıdır.
        </span>
      </div>
    );
  }
}
