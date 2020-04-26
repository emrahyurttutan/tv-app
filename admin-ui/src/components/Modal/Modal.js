import React, { Component } from "react";
import { Dialog } from "primereact/dialog";

export default class Modal extends Component {
  static defaultProps = {
    footer: null
  };
  render() {
    const { isModal, title, className, footer } = this.props;
    return (
      <Dialog
        header={title}
        footer={footer}
        visible={isModal}
        style={{ width: "50vw" }}
        onHide={this.props.onHide}
        maximizable
        className={className}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
