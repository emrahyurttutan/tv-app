import { connect } from "react-redux";
import { ChannelNew } from "../../../routes/Channels";
import {
  pageInputChange,
  pageFormErrorChange,
  pageSaveOrUpdate,
  pageFormDataClean
} from "../../../actions/page-actions";
import { isAuthMethodName } from "../../../selectors/app-selectors";
import { getCategoriesOptions } from "../../../actions/app-actions";
function mapStateToProps(state) {
  return {
    isAuthorizedSaveOrUpdate: isAuthMethodName(
      "SaveOrUpdate",
      "Channels",
      state.app.authmenu
    ),
    formData: state.page.formData,
    formErrors: state.page.formErrors,
    formLoader: state.page.formLoader,
    categoryList: state.app.categoryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageInputChange: (...args) => dispatch(pageInputChange(...args)),
    pageFormErrorChange: (...args) => dispatch(pageFormErrorChange(...args)),
    pageSaveOrUpdate: (...args) => dispatch(pageSaveOrUpdate(...args)),
    pageFormDataClean: (...args) => dispatch(pageFormDataClean(...args)),
    getCategoriesOptions: (...args) => dispatch(getCategoriesOptions(...args))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelNew);
