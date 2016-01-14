/**
 * App
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MenuBar from '../components/MenuBar'
import LoginForm from '../components/Login'
import RegisterForm from '../components/Register'
import WeeklyPlanner from '../components/Planner'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as actions from '../actions'

class App extends Component {
    render() {
        const dispatch = this.props.dispatch

        let central = ''
        switch(this.props.page) {
        case '':
        case '/':
        case '/plan':
          central = <WeeklyPlanner 
            people={this.props.planner.people}
            currentPerson={this.props.planner.currentPerson}
            onCalorieLevelChange={(level) => dispatch(actions.changeCalorieLevel(level))}
            formIssues={this.props.formIssues} />
          break

        case '/login':
          central = <LoginForm
                      loginRunning={this.props.loginRunning}
                      formIssues={this.props.formIssues}
                      onLoginClick={(email, pw) => dispatch(actions.attemptLogin(email, pw))}
                      onGotoRegisterClick={() => dispatch(actions.gotoRegister())} />
          break

        case '/register':
          central = <RegisterForm
                      formIssues={this.props.formIssues}
                      onGotoLoginClick={() => dispatch(actions.gotoLogin())}
                      onRegisterClick={(email, pw, name, company, industry) => dispatch(actions.attemptRegistration(email, pw, name, company, industry))}
                      onRegistrationInvalid={(issues) => dispatch(actions.badForm(issues))} />
          break

        default:
            central = <div className='message'>{"404? This isn't the page you were looking for, but unfortunately that one seems to be missing."}</div>
        }

        return (
            <div>
              <MenuBar
                isLoggedIn={this.props.isLoggedIn}
                name={this.props.userName}
                onGotoPlannerClick={() => dispatch(actions.gotoPlanner())}
                onGotoLoginClick={() => dispatch(actions.gotoLogin())}
                onGotoRegisterClick={() => dispatch(actions.gotoRegister())}
                onLogoutClick={() => dispatch(actions.attemptLogout())} />
              <section id="main" className="container 75%">
                <Header
                  page={this.props.page}
                  message={this.props.pageMessage}
                  />
                <div className="box">{central}</div>
              </section>
              <Footer />
            </div>
        )
    }
}

App.propTypes = {
  // General state
  page: PropTypes.string.isRequired,
  formIssues: PropTypes.array.isRequired,
  pageMessage: PropTypes.string.isRequired,

  // Forms/actions in progress
  loginRunning: PropTypes.bool.isRequired,
  
  // User-specific
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,

  // Planner
  planner: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  let name = state.login.user.fullname
  if(!name) {
    name = state.login.user.email
  }

  return {
    page: state.page,
    formIssues: state.issues,
    pageMessage: state.pageMessage,

    loginRunning: state.login.loginRunning,

    isLoggedIn: state.login.isIn,
    userName: name,

    planner: state.planner
  }
}

export default connect(mapStateToProps)(App)

