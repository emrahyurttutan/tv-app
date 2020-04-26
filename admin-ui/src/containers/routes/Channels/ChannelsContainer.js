import { connect } from "react-redux";
import { Channels } from "../../../routes/Channels";
import { isAuthMethodName } from "../../../selectors/app-selectors";
import { getChannels } from "../../../actions/app-actions";

function mapStateToProps(state) {
  return {
    isAuthorizedSaveOrUpdate: isAuthMethodName(
      "SaveOrUpdate",
      "Channels",
      state.app.authmenu
    ),
    isAuthorizedDeleted: isAuthMethodName(
      "ChangeStatus",
      "Channels",
      state.app.authmenu
    ),
    channelList: state.app.channelList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChannels: (...args) => dispatch(getChannels(...args))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
