import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/header.scss";

class Header extends Component {
  constructor() {
    super();

    this.handleProfileButton = this.handleProfileButton.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
    // this.props.logoutButton = this.props.logoutButton.bind(this);
  }

  handleSearchButton(e) {
    console.log("Search button: ");
    console.log(this.props.history, "this is history");
    e.preventDefault();
    this.props.history.push("/");
  }

  handleProfileButton(e) {
    console.log("call to profile");
    e.preventDefault();
    this.props.history.push("/profile");
  }

  // handleLogout(e) {
  //   console.log("called to logout");
  //   e.preventDefault();

  //   this.props.history.push("/register");
  // }

  determineRenderForButtons() {
    if (this.props.currentUser.name)
      return (
        <div className="buttonsDiv">
          <button className="searchButton" onClick={this.handleSearchButton}>
            Search
          </button>
          <button className="profileButton" onClick={this.handleProfileButton}>
            Profile
          </button>
          <button className="logoutButton" onClick={this.props.logoutButton}>
            Logout
          </button>
        </div>
      );
    else return;
  }

  render() {
    return (
      <header className="header">
        <div>
          <span className="spanOne">Local</span>
          <span className="spanTwo">Host</span>
          <span className="spanThree"> 3000</span>
        </div>
        {this.determineRenderForButtons()}
      </header>
    );
  }
}

export default withRouter(Header);
