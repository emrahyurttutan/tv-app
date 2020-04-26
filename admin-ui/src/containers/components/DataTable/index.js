import { connect } from "react-redux";
import DataTable from "../../../components/DataTable";
import { pageDelete } from "../../../actions/page-actions";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onDeleteRequest: (...args) => dispatch(pageDelete(...args))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
