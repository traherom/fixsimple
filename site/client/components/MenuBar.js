
import React, { Component, PropTypes } from 'react'

export default class MenuBar extends Component {
  render() {
    const weeklyPlannerLink = <li><a href="/plan" onClick={e => this.switchToPlanner(e)}>Planner</a></li>

    let loginStatus = ''
    if(this.props.isLoggedIn) {
      loginStatus = (
        <ul>
          {weeklyPlannerLink}
          <li>Welcome, {this.props.name}</li>
          <li><a href="/logout" className="button" onClick={e => this.logout(e)}>Log Out</a></li>
        </ul>
        )
    } else {
      loginStatus = (
        <ul>
          {weeklyPlannerLink}
          <li><a href="/register" onClick={e => this.switchToRegistration(e)}>Register</a></li>
          <li><a href="/login" className="button" onClick={e => this.switchToLogin(e)}>Log In</a></li>
        </ul>
      )
    }

    return (
      <header id="header">
        <h1><a href="/">21 Fix Fixer</a></h1>
        <nav id="nav">{loginStatus}</nav>
      </header>
    )
  }

  switchToRegistration(e) {
    e.preventDefault()
    this.props.onGotoRegisterClick()
  }

  switchToLogin(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onGotoLoginClick()
  }

  logout(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onLogoutClick()
  }

  switchToPlanner(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onGotoPlannerClick()
  }
}

MenuBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onGotoPlannerClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onGotoRegisterClick: PropTypes.func.isRequired,
  onGotoLoginClick: PropTypes.func.isRequired
}
