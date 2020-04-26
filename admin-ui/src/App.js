import React, { Component } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import classNames from "classnames";
import { connect } from "react-redux";
import { authInit } from "./actions/auth-actions";
import { menuItemClick, toggleMenu } from "./actions/app-actions";
import authService from "./utils/authService";
import PublicRoute from "./PublicRoute";
import AuthRouteContainer from "./containers/routes/AuthRouteContainer";
import HomeContainer from "./containers/routes/HomeContainer";
import ProfileContainer from "./containers/routes/ProfileContainer";
import LoadingComponent from "./components/Loading";
import Loading from "./containers/components/Loading";
import AccessDenied from "./routes/AccessDenied";
import { AppBottomBar, AppTopBar } from "./components/App";
import Login from "./containers/routes/LoginContainer";
import {
  Category,
  CategoryNew,
  CategoryEdit,
  ChannelEdit,
  Channels,
  ChannelNew,
} from "./containers/routes";
import AppMenuContainer from "./containers/components/AppMenu";
import AppInlineProfileContainer from "./containers/components/AppInlineProfile";
import ModalContainer from "./containers/components/Modal";
import "primereact/resources/themes/nova-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./layout/layout.css";

class App extends Component {
  componentWillMount() {
    if (authService.isExistsToken()) {
      this.props.authInit();
    }
  }
  onSidebarClick = (event) => {
    this.layoutMenuScroller &&
      setTimeout(() => {
        this.layoutMenuScroller && this.layoutMenuScroller.moveBar();
      }, 500);
  };

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.props.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  }

  onWrapperClick = () => {
    if (this.props.mobileMenuActive) this.props.onWrapperClick();
  };

  render() {
    const {
      isAuth,
      layoutMode,
      staticMenuInactive,
      overlayMenuActive,
      mobileMenuActive,
      layoutColorMode,
    } = this.props;

    let wrapperClass = classNames("layout-wrapper", {
      "layout-overlay": layoutMode === "overlay",
      "layout-static": layoutMode === "static",
      "layout-static-sidebar-inactive":
        staticMenuInactive && layoutMode === "static",
      "layout-overlay-sidebar-active":
        overlayMenuActive && layoutMode === "overlay",
      "layout-mobile-sidebar-active": mobileMenuActive,
    });
    let sidebarClassName = classNames("layout-sidebar", {
      "layout-sidebar-dark": layoutColorMode === "dark",
    });

    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute exact component={Login} path="/" />
          {authService.isExistsToken() ? (
            !isAuth ? (
              <LoadingComponent show={!isAuth} className="in-middle" />
            ) : (
              <>
                <Loading className="in-middle" />
                <ModalContainer />
                <div className={wrapperClass} onClick={this.onWrapperClick}>
                  <AppTopBar onToggleMenu={this.props.onToggleMenu} />
                  <div
                    ref={(el) => (this.sidebar = el)}
                    className={sidebarClassName}
                    onClick={this.onSidebarClick}
                  >
                    <ScrollPanel
                      ref={(el) => (this.layoutMenuScroller = el)}
                      style={{ height: "100%" }}
                    >
                      <div className="layout-sidebar-scroll-content">
                        <div className="layout-logo">
                          <img
                            alt="Logo"
                            src="//yurttutan.net/public/files/images/logo2.png"
                            width={80}
                          />
                        </div>
                        <AppInlineProfileContainer />
                        <AppMenuContainer />
                      </div>
                    </ScrollPanel>
                  </div>
                  <div className="layout-main">
                    <Route
                      exact
                      component={AccessDenied}
                      path="/access-denied"
                    />
                    <AuthRouteContainer
                      exact
                      path="/home"
                      component={HomeContainer}
                      SN="HomePage"
                    />
                    <AuthRouteContainer
                      exact
                      path="/profile"
                      component={ProfileContainer}
                      SN="HomePage"
                    />
                    <AuthRouteContainer
                      exact
                      path="/category"
                      component={Category}
                      SN="Category"
                    />
                    <AuthRouteContainer
                      exact
                      path="/category/new"
                      component={CategoryNew}
                      SN="Category"
                      MN="SaveOrUpdate"
                    />
                    <AuthRouteContainer
                      exact
                      path="/category/edit/:id"
                      component={CategoryEdit}
                      SN="Category"
                      MN="SaveOrUpdate"
                    />
                    <AuthRouteContainer
                      exact
                      path="/channels"
                      component={Channels}
                      SN="Channels"
                    />
                    <AuthRouteContainer
                      exact
                      path="/channels/new"
                      component={ChannelNew}
                      SN="Channels"
                      MN="SaveOrUpdate"
                    />
                    <AuthRouteContainer
                      exact
                      path="/channels/edit/:id"
                      component={ChannelEdit}
                      SN="Channels"
                      MN="SaveOrUpdate"
                    />
                  </div>
                  <AppBottomBar />
                </div>
              </>
            )
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.app.menu && state.app.menu.length > 0 ? true : false,
    staticMenuInactive: state.app.staticMenuInactive,
    layoutMode: state.app.layoutMode,
    mobileMenuActive: state.app.mobileMenuActive,
    layoutColorMode: state.app.layoutColorMode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authInit: (...args) => dispatch(authInit(...args)),
    onWrapperClick: (...args) => dispatch(menuItemClick(...args)),
    onToggleMenu: (...args) => dispatch(toggleMenu(...args)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
