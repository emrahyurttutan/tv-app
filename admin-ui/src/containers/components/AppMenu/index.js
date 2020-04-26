import { connect } from "react-redux";
import { AppMenu } from "../../../components/App";
import {
  menuItemClick,
  menuActiveItemChange
} from "../../../actions/app-actions";
function mapStateToProps(state) {
  return {
    model: state.app.menu,
    activeItem: state.app.activeItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuItemClick: (...args) => dispatch(menuItemClick(...args)),
    menuActiveItemChange: (...args) => dispatch(menuActiveItemChange(...args))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu);
