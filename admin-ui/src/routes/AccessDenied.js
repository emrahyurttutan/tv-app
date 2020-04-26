import React, { Component } from "react";
import PageContent from "../components/PageContent";
export default class AccessDenied extends Component {
  render() {
    return (
      <PageContent pageTitle={"Erişiminiz Yetkiniz Yok"}>
        Bu sayfaya erişim izniniz yok.
      </PageContent>
    );
  }
}
