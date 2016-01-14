import { combineReducers } from 'redux'
import * as actions from './actions'
import * as data from './data'

/**
 * Planner
 */
const initialPlannerState = {
  currentPerson: 0,
  people: [
    {
      name: "Person 1",
      level: 1200,
      containers: data.buildEmptyContainers(1200)
    }
  ]
}
function planner(state = initialPlannerState, action) {
  let newState = Object.assign({}, state)

  switch(action.type) {
    case actions.CHANGE_CALORIE_LEVEL:
      newState.people[state.currentPerson].level = action.level
      newState.people[state.currentPerson].containers = data.buildEmptyContainers(action.level)
      break

    default:
      return state
  }

  console.log(newState)
  return newState
}

/**
 * Login
 */
const initialLoginState = {
  loginRunning: false,
  isIn: false,
  user: {
    email: '',
    name: '',
    session: ''
  }
}
function login(state = initialLoginState, action) {
	  switch(action.type) {
    case actions.LOGOUT:
      return {
        ...state,
        ...initialLoginState
      }
    case actions.SUCCESSFUL_LOGIN:
      return {
        ...state,
        loginRunning: false,
        isIn: true,
        user: {
          email: action.email,
          name: action.name,
          session: action.session
        }
      }
    case actions.LOGIN_STOPPED:
      return {
        ...state,
        loginRunning: false
      }
    case actions.LOGIN_RUNNING:
      return {
        ...state,
        loginRunning: true
      }
	  default:
		    return state
	  }
}

/**
  * Registration - not needed currently
  */
const initialRegistrationState = {}
function registration(state = initialRegistrationState, action) {
	  switch(action.type) {
	  default:
		    return state
	  }
}

/**
 * Universal
 */
function page(state = '/login', action) {
    switch(action.type) {
    case actions.GOTO_PAGE:
        return action.url
    default:
        return state
    }
}

function issues(state = [], action) {
    switch(action.type) {
    case actions.FORM_ISSUES:
        return action.issues

    // A bunch of cases simply wipe out any pending issues
    case actions.LOGOUT:
    case actions.SUCCESSFUL_LOGIN:
    case actions.SUCCESSFUL_REGISTRATION:
        return []
    default:
         return state
    }
}

function pageMessage(state = '', action) {
    switch(action.type) {
    case actions.SET_PAGE_MESSAGE:
        return action.msg

    case actions.CLEAR_PAGE_MESSAGE:
        return ''

    default:
        return state
    }
}

const initialProcessingState = {
    working: false,
    jobs: []
}
function processing(state = initialProcessingState, action) {
    switch(action.type) {
    case actions.PROCESSING: {
        let ids = state.jobs.slice()
        ids.push(action.jobId)
        return {
            working: true,
            jobs: ids
        }
    }
    case actions.NOT_PROCESSING: {
        // Drop the id if possible
        let i = state.jobs.indexOf(action.jobId)
        if(i == -1) {
            console.error('Could not remove job id ' + action.jobId + ', not currently being processed')
            return state
        }

        let ids = state.jobs.slice()
        ids.splice(i, 1)
        let jobsExist = ids.length > 0

        return {
            working: jobsExist,
            jobs: ids
        }
    }
    default:
        return state
    }
}

const masterReducer = combineReducers({
    login,
    registration,
    issues,
    processing,
    pageMessage,
    page,
    planner
})

export default masterReducer

