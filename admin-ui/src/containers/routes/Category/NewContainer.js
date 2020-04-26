import { connect } from "react-redux";
import { CategoryNew } from "../../../routes/Category";
import {
  pageInputChange,
  pageFormErrorChange,
  pageSaveOrUpdate,
  pageFormDataClean
} from "../../../actions/page-actions";
import { isAuthMethodName } from "../../../selectors/app-selectors";

function mapStateToProps(state) {
  return {
    isAuthorizedSaveOrUpdate: isAuthMethodName(
      "SaveOrUpdate",
      "Category",
      state.app.authmenu
    ),
    formData: state.page.formData,
    formErrors: state.page.formErrors,
    formLoader: state.page.formLoader
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageInputChange: (...args) => dispatch(pageInputChange(...args)),
    pageFormErrorChange: (...args) => dispatch(pageFormErrorChange(...args)),
    pageSaveOrUpdate: (...args) => dispatch(pageSaveOrUpdate(...args)),
    pageFormDataClean: (...args) => dispatch(pageFormDataClean(...args))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryNew);
