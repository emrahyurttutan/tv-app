import { connect } from "react-redux";
import AuthRoute from "../../routes/AuthRoute";
import { urlIsAuth, isAuthMethodName } from "../../selectors/app-selectors";
function mapStateToProps(state) {
  return {
    menu: state.app.menu,
    authmenu: state.app.authmenu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    urlIsAuth: (...args) => urlIsAuth(...args),
    isAuthMethodName: (...args) => isAuthMethodName(...args)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRoute);
