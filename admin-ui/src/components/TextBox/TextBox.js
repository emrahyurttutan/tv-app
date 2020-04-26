import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
export default class TextBox extends Component {
  static defaultProps = {
    value: ""
  };
  renderFormComponet = () => {
    const { type, className } = this.props;
    switch (type) {
      case "password":
        return (
          <Password
            className={className}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );

      default:
        return (
          <InputText
            className={className}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
    }
  };
  render() {
    const { label, errorMessage, value } = this.props;

    return (
      <>
        <span className="p-float-label">
          {this.renderFormComponet()}

          {!value && <label htmlFor="in">{label}</label>}
        </span>
        {errorMessage && <span className="errorMessage">{errorMessage}</span>}
      </>
    );
  }
}
