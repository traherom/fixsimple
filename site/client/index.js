import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import masterReducer from './reducers'
import * as actions from './actions'
import jQuery from 'jquery'

/**
 * Global settings
 */
jQuery.ajaxSetup({
  dataType: 'json',
  cache: false
})

// State could have been given to us by the server
const stateFromServer = window.__INITIAL_STATE

// const logger = createLogger() // For debugging, add to applyMiddleware
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(masterReducer, stateFromServer)

/**
  * Render
  */
let rootElement = document.getElementById('page-wrapper')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

