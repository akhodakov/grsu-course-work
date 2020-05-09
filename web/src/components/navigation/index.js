import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as actions from "../../actions";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [
        {
          title: "A new monthly report is ready to download!",
          icon: "fa fa-donate text-white",
          description: "December 12, 2019",
          link: "",
          type: "primary",
        },
        {
          title: "$290.29 has been deposited into your account!",
          icon: "fa fa-donate text-white",
          description: "December 7, 2019",
          link: "",
          type: "success",
        },
      ],
      redirect: false,
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onLogoutClick = () => {
    this.props.logout();
    this.setState({
      redirect: true,
    });
  };

  onSearch = () => {};

  getAlerts() {
    var alerts = this.state.alerts;
    var content = alerts.map((item) => {
      return (
        <a className="dropdown-item d-flex align-items-center" href={item.link}>
          <div className="mr-3">
            <div className={"icon-circle bg-" + item.type}>
              <i className={item.icon}></i>
            </div>
          </div>
          <div>
            <div className="small text-gray-500">{item.description}</div>
            <span className="font-weight-bold">{item.title}</span>
          </div>
        </a>
      );
    });
    return content;
  }

  getProfile() {
    var avatar = this.props.account.avatar
      ? this.props.account.avatar
      : "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=640";
    return (
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            {this.props.account.name}
          </span>
          <img className="img-profile rounded-circle" src={avatar} />
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <Link to="/profile" className="dropdown-item">
            <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </Link>
          <Link to="/settings" className="dropdown-item">
            <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </Link>
          <Link to="/activity" className="dropdown-item">
            <i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </Link>
          <div className="dropdown-divider"></div>
          <a
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    );
  }

  render() {
    var alerts = this.getAlerts();
    var profile = this.getProfile();

    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top d-flex justify-content-end shadow-sm">
        {this.state.redirect ? <Redirect to="/" /> : null}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <form className="d-none d-sm-inline-block form-inline navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <ul className="navbar-nav">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-search fa-sm  "></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form class="form-inline mr-auto w-100 navbar-search">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bell fa-fw"></i>
              <span className="badge badge-danger badge-counter">
                {alerts.length}+
              </span>
            </a>

            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 className="dropdown-header">Alerts Center</h6>
              {alerts}
              <a
                className="dropdown-item text-center small text-gray-500"
                href="#"
              >
                Show All Alerts
              </a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {profile}
        </ul>

        <div
          class="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="logoutModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="logoutModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-dismiss="modal"
                  onClick={this.onLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { account: state.account };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const Component = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default Component;