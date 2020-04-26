import React, { Component } from "react";
import { Column } from "primereact/column";
import Button from "../../components/Button";
import PageContent from "../../components/PageContent";
import DataTableContainer from "../../containers/components/DataTable";

export default class Category extends Component {
  componentWillMount() {
    this.props.getCategories("category");
  }

  render() {
    const { isAuthorizedSaveOrUpdate } = this.props;
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Kategoriler
        {isAuthorizedSaveOrUpdate && (
          <Button
            icon="pi pi-plus"
            style={{ float: "right" }}
            label="Yeni Kategori"
            url={"category/new"}
          />
        )}
      </div>
    );
    const footer = `${this.props.categoryList.length} kategori bulundu`;

    return (
      <PageContent
        pageTitle={"Kategoriler"}
        breadCrumbItems={[{ label: "Kategoriler" }]}
      >
        <DataTableContainer
          data={this.props.categoryList}
          header={header}
          footer={footer}
          url="category"
          editButton={rowData => (
            <Button
              type="button"
              icon="pi pi-pencil"
              label="Düzenle"
              className="p-button-success"
              style={{ marginRight: ".5em" }}
              url={"category/edit/" + rowData.id}
            />
          )}
        >
          <Column field="name" header="Kategori Adı" />
        </DataTableContainer>
      </PageContent>
    );
  }
}
