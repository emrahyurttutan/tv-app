import React, { Component } from "react";
import PageContent from "../components/PageContent";
export default class Profile extends Component {
  render() {
    return (
      <PageContent
        pageTitle={"Profilim"}
        breadCrumbItems={[{ label: "Profilim" }]}
      >
        <div className="p-grid p-fluid dashboard">
          <div>Profil Sayfası</div>
        </div>
      </PageContent>
    );
  }
}
