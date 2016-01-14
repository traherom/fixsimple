import jQuery from 'jquery'
import * as apiErr from './errors.js'

/**
 * Possible actions
 */
export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN'
export const LOGIN_RUNNING = 'LOGIN_RUNNING' // Indicates that a login has been started and sent to the server
export const LOGIN_STOPPED = 'LOGIN_STOPPED' // Indicates that a login attempt has received a response from the server (success or failure)
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
export const LOGOUT = 'LOGOUT'

export const ATTEMPT_REGISTRATION = 'ATTEMPT_REGISTER'
export const SUCCESSFUL_REGISTRATION = 'SUCCESSFUL_REGISTER'

export const GOTO_PLANNER = 'GOTO_PLANNER'
export const CHANGE_CALORIE_LEVEL = 'CHANGE_CALORIES'

export const GOTO_PAGE = 'PAGE_CHANGE'
export const FORM_ISSUES = 'FORM_ISSUES'
export const PROCESSING = 'PROCESSING_START'
export const NOT_PROCESSING = 'PROCESSING_STOP'
export const SET_PAGE_MESSAGE = 'PAGE_MESSAGE_SET'
export const CLEAR_PAGE_MESSAGE = 'PAGE_MESSAGE_CLEAR'

/**
 * Planner
 */
export function changeCalorieLevel(level) {
  if(!level) {
    throw "Level must be given"
  }

  let intLevel = level
  if(typeof level == "string") {
    intLevel = parseInt(level)
  }
  return {
    type: CHANGE_CALORIE_LEVEL,
    level: intLevel
  }
}

/**
 * Login and registration
 */
export function gotoLogin() {
  return gotoPage('/login')
}

function loginAttemptStarted() {
  return {
    type: LOGIN_RUNNING
  }
}

function loginAttemptStopped() {
  return {
    type: LOGIN_STOPPED
  }
}

export function attemptLogin(email, pw) {
    return function(dispatch) {
      dispatch(loginAttemptStarted())
      dispatch(processingStarted(1000))

      jQuery.get('/api/v1/users/login', {
          email: email,
          pw1: pw
      }).done(json => {
        switch(json.err) {
        case apiErr.NONE:
          console.log("Login successful")
          dispatch(loginSuccessful(json.fullname, json.email, json.session_id))
          dispatch(gotoCertList())
          dispatch(updateCertList())
          break
        default:
          dispatch(setPageMessage(json.msg))
          if(json.formIssues) {
            dispatch(badForm(serverIssuesToClient(json.formIssues)))
           }
         }
        }).fail((xhr, ex, err) => {
          let msg = "Error with api server: " + err
          console.log(msg)
          dispatch(setPageMessage(msg))
        }).always(() => {
          dispatch(processingStopped(1000))
          dispatch(loginAttemptStopped())
        })
    }
}

function loginSuccessful(fullname, email, session) {
  return {
    type: SUCCESSFUL_LOGIN,
    fullname: fullname,
    email: email,
    session: session
  }
}

export function attemptLogout() {
    return (dispatch) => {
      dispatch({
          type: LOGOUT
      })
      dispatch(gotoPage('/login'))
      dispatch(setPageMessage('You have been logged out'))
    }
}

export function gotoRegister() {
  return gotoPage('/register')
}

export function attemptRegistration(email, pw, fullname, company, industry) {
    return function(dispatch) {
        dispatch(processingStarted(7022))

        return jQuery.get('/api/v1/users/register', {
                fullname: fullname,
                email: email,
                pw1: pw,
                company: company,
                industry: industry
            }).done(json => {
              dispatch(setPageMessage(json.msg))
              switch(json.err) {
              case apiErr.NONE:
                console.log("Registration successful")
                dispatch(gotoLogin())
                break
              case apiErr.SESSION:
                dispatch(attemptLogout())
                break
              default:
                if(json.formIssues) {
                  dispatch(badForm(serverIssuesToClient(json.formIssues)))
                }
              }
            }).fail((xhr, ex, err) => {
              let msg = "Error with api server: " + err
              console.log(msg)
              dispatch(setPageMessage(msg))
            }).always(() => {
              dispatch(processingStopped(7022))
            })
    }
}

/**
 * Generic actions
 */
export function gotoPage(page) {
  return {
    type: GOTO_PAGE,
    url: page
  }
}

export function badForm(issues) {
    // Issues should be in the form of id: text description
    return {
        type: FORM_ISSUES,
        issues: issues
    }
}

export function processingStarted(id) {
    return {
        type: PROCESSING,
        jobId: id
    }
}

export function processingStopped(id) {
    return {
        type: NOT_PROCESSING,
        jobId: id
    }
}

export function setPageMessage(msg) {
    return {
        type: SET_PAGE_MESSAGE,
        msg: msg
    }
}

export function clearPageMessage(msg) {
    return {
        type: CLEAR_PAGE_MESSAGE
    }
}

/**
 * Utilities
 */
function serverIssuesToClient(issues) {
    // The server gives issues in the form object { id: msg, ... }
    // We want them in [ { id: id, desc: msg }, ... ]
    let converted = []
    for(let id in issues) {
        if(!issues.hasOwnProperty(id))
            continue

        converted.push({
            id: id,
            desc: issues[id]
        })
    }

    return converted
}
