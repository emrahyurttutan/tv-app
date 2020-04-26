import { connect } from "react-redux";
import Loading from "../../../components/Loading";

function mapStateToProps(state) {
  return {
    show: state.app.appLoading
  };
}

export default connect(
  mapStateToProps,
  {}
)(Loading);
