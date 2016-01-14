import React, { Component, PropTypes } from 'react'
import addField from '../form_builder'

export default class LoginForm extends Component {
    render() {
        let fields = []
        fields.push(addField('email', 'Email', this.props.formIssues))
        fields.push(addField('pw1', 'Password', this.props.formIssues, 'password'))

        let loginButton = <input type='submit' value='Log In' />
        if(this.props.loginRunning) {
          loginButton = <input type='submit' value='Logging In...' disabled />
        }
        
        return (
          <div>
            <form onSubmit={e => this.submit(e)}>
               {fields}
               {loginButton}
            </form>

            <a href="/register" onClick={e => this.switchToRegistration(e)}>Need to register?</a>
          </div>
        )
    }

    submit(e) {
        e.preventDefault()
        this.props.onLoginClick(email.value, pw1.value)
    }

    switchToRegistration(e) {
        e.preventDefault()
        this.props.onGotoRegisterClick()
    }
}

LoginForm.propTypes = {
  loginRunning: PropTypes.bool.isRequired,
  formIssues: PropTypes.array.isRequired,
  onGotoRegisterClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired
}

