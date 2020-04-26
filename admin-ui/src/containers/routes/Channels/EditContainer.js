import { connect } from "react-redux";
import { ChannelEdit } from "../../../routes/Channels";
import {
  pageInputChange,
  pageFormErrorChange,
  pageSaveOrUpdate,
  pageFormDataClean,
  pageEditData
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
    pageEditData: (...args) => dispatch(pageEditData(...args)),
    pageFormErrorChange: (...args) => dispatch(pageFormErrorChange(...args)),
    pageSaveOrUpdate: (...args) => dispatch(pageSaveOrUpdate(...args)),
    pageFormDataClean: (...args) => dispatch(pageFormDataClean(...args)),
    getCategoriesOptions: (...args) => dispatch(getCategoriesOptions(...args))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelEdit);
