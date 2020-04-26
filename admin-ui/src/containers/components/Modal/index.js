import { connect } from "react-redux";
import Modal from "../../../components/Modal";
import { pageModalHide } from "../../../actions/page-actions";

function mapStateToProps(state) {
  return {
    ...state.page.modal,
    isModal: state.page.isModal
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onHide: (...args) => dispatch(pageModalHide(...args))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
