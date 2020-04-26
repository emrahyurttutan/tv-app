import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Modal from "../Modal";
export default class CustomDataTable extends Component {
  state = {
    data: {},
    index: 0,
    isModal: false
  };

  onDeleteRequest = () => {
    const { data } = this.state;
    const { url } = this.props;
    this.props.onDeleteRequest(
      `${url}/delete`,
      data.id,
      {
        modal: { title: "Silme İşlemi Başarılı" },
        successCallBack: () => window.location.reload()
      },
      { modal: { title: "Silme İşlemi Başarısız" } }
    );
  };
  actionTemplate = (rowData, column) => {
    return (
      <div>
        {this.props.editButton(rowData)}
        <Button
          type="button"
          icon="pi pi-trash"
          label="Sil"
          className="p-button-warning"
          onClick={() => {
            this.setState({
              data: rowData,
              index: column.rowIndex,
              isModal: true
            });
          }}
        />
      </div>
    );
  };

  render() {
    const { footer, header, data } = this.props;
    const { isModal } = this.state;
    const modalFooter = (
      <div>
        <Button
          label="Evet"
          icon="pi pi-check"
          onClick={this.onDeleteRequest}
        />
        <Button
          label="Hayır"
          icon="pi pi-times"
          onClick={() => this.setState({ isModal: false, data: {}, index: 0 })}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <>
        {isModal && (
          <Modal
            title="Kaydı silmek istediğinize emin misin ?"
            footer={modalFooter}
            isModal={isModal}
            onHide={() => this.setState({ isModal: false })}
          />
        )}
        <DataTable value={data} header={header} footer={footer}>
          {this.props.children}
          <Column
            body={this.actionTemplate}
            style={{
              textAlign: "center",
              width: "20em"
            }}
          />
        </DataTable>
      </>
    );
  }
}
