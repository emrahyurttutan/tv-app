import { connect } from "react-redux";
import { AppInlineProfile } from "../../../components/App";
import { showUserProfile, hideUserProfile } from "../../../actions/app-actions";
import { authLogout } from "../../../actions/auth-actions";

function mapStateToProps(state) {
  return {
    userInfo: state.auth.info ? state.auth.info : {},
    isUserProfile: state.app.isUserProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showUserProfile: (...args) => dispatch(showUserProfile(...args)),
    hideUserProfile: (...args) => dispatch(hideUserProfile(...args)),
    authLogout: (...args) => dispatch(authLogout(...args))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInlineProfile);
