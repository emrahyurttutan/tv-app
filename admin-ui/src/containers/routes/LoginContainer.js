import {
  authInputChange,
  authLogin,
  authErrorChange,
  authAlertMessageClear
} from "../../actions/auth-actions";
import { connect } from "react-redux";
import Login from "../../routes/Login";

function mapStateToProps(state) {
  return {
    formData: state.auth.formData,
    formErrors: state.auth.formErrors,
    alertMessageType: state.auth.alertMessageType,
    formLoader: state.auth.formLoader
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authInputChange: (...args) => dispatch(authInputChange(...args)),
    authErrorChange: (...args) => dispatch(authErrorChange(...args)),
    authLogin: () => dispatch(authLogin()),
    authAlertMessageClear: () => dispatch(authAlertMessageClear())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
