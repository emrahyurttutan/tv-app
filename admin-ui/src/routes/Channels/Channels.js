import React, { Component } from "react";
import { Column } from "primereact/column";
import Button from "../../components/Button";
import PageContent from "../../components/PageContent";
import DataTableContainer from "../../containers/components/DataTable";

export default class Channels extends Component {
  componentWillMount() {
    this.props.getChannels("channels");
  }

  render() {
    const { isAuthorizedSaveOrUpdate } = this.props;
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Kanallar
        {isAuthorizedSaveOrUpdate && (
          <Button
            icon="pi pi-plus"
            style={{ float: "right" }}
            label="Yeni Kanal"
            url={"channels/new"}
          />
        )}
      </div>
    );
    const footer = `${this.props.channelList.length} kanal bulundu`;

    return (
      <PageContent
        pageTitle={"Kanallar"}
        breadCrumbItems={[{ label: "Kanallar" }]}
      >
        <DataTableContainer
          data={this.props.channelList}
          header={header}
          footer={footer}
          url="channels"
          editButton={rowData => (
            <Button
              type="button"
              icon="pi pi-pencil"
              label="Düzenle"
              className="p-button-success"
              style={{ marginRight: ".5em" }}
              url={"channels/edit/" + rowData.id}
            />
          )}
        >
          <Column field="name" header="Kanal Adı" />
        </DataTableContainer>
      </PageContent>
    );
  }
}
