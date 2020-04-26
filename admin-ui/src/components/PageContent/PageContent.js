import React, { Component } from "react";
import PropTypes from "prop-types";
import { BreadCrumb } from "primereact/breadcrumb";

import PageTitle from "../PageTitle";
export default class PageContent extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    title: PropTypes.string,
    breadCrumbItems: PropTypes.array
  };
  render() {
    const { title, pageTitle, children, breadCrumbItems } = this.props;
    const home = {
      icon: "pi pi-home",
      url: "/home"
    };

    return (
      <PageTitle title={pageTitle}>
        <div style={{ flex: "1 1 0%" }}>
          {breadCrumbItems && breadCrumbItems.length > 0 && (
            <BreadCrumb
              model={breadCrumbItems}
              home={home}
              style={{ marginBottom: 20 }}
            />
          )}
          <div className="card-w-title">
            {title && <h1>{title}</h1>}
            <div className="page-content-wrapper">{children}</div>
          </div>
        </div>
      </PageTitle>
    );
  }
}
