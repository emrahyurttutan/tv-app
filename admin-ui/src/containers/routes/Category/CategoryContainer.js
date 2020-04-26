import { connect } from "react-redux";
import { Category } from "../../../routes/Category";
import { isAuthMethodName } from "../../../selectors/app-selectors";
import { getCategories } from "../../../actions/app-actions";

function mapStateToProps(state) {
  return {
    isAuthorizedSaveOrUpdate: isAuthMethodName(
      "SaveOrUpdate",
      "Category",
      state.app.authmenu
    ),
    isAuthorizedDeleted: isAuthMethodName(
      "ChangeStatus",
      "Category",
      state.app.authmenu
    ),
    categoryList: state.app.categoryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (...args) => dispatch(getCategories(...args))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
