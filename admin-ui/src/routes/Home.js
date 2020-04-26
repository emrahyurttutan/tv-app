import React, { Component } from "react";
import PageContent from "../components/PageContent";
export default class Home extends Component {
  render() {
    return (
      <PageContent pageTitle={"home app"}>
        <div className="p-grid p-fluid dashboard">
          <div className="p-col-12 p-lg-4">
            <div className="card summary">
              <span className="title">Kategoriler</span>
              <span className="detail">Kategori listele, düzenle</span>
              <span className="count visitors">11</span>
            </div>
          </div>
          <div className="p-col-12 p-lg-4">
            <div className="card summary">
              <span className="title">Kanallar</span>
              <span className="detail">
                Kanal listele, yeni kategori, düzenle
              </span>
              <span className="count purchases">30</span>
            </div>
          </div>
          <div className="p-col-12 p-lg-4">
            <div className="card summary">
              <span className="title">Test</span>
              <span className="detail">Test içeriği</span>
              <span className="count revenue">10</span>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}
