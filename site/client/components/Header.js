import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  render() {
    let title='21 Day Fix Fixer'
    switch(this.props.page) {
      case '/login':
        title = 'Login'
        break

      case '/register':
        title = 'Register'
        break
    }

    return (
      <div className="header">
        <header>
          <h2>{title}</h2>
          <p className="message">{this.props.message}</p>
        </header>
      </div>
    )
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.onLogoutClick()
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  message: PropTypes.string
}
