import React, { Component } from "react";
import LoginComponent from "../components/Login";
import PageTitle from "../components/PageTitle";
export default class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.alertMessageType === "success") {
      this.props.history.push("/home");
    }
  }
  componentWillUnmount() {
    this.props.authAlertMessageClear();
  }
  render() {
    return (
      <PageTitle title={"Login"}>
        <LoginComponent {...this.props} />
      </PageTitle>
    );
  }
}
