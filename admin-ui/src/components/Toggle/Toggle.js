import React, { Component } from "react";
import { ToggleButton } from "primereact/togglebutton";

export default class Toggle extends Component {
  render() {
    const { checked, onChange, label, className } = this.props;
    return (
      <div className={className}>
        <label>{label}</label>
        <ToggleButton
          checked={checked}
          onChange={onChange}
          onLabel="Evet"
          offLabel="Hayır"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
        />
      </div>
    );
  }
}
