/*
 * Node/server stuff
 */
require('babel-register')

const port = 3000
const staticDir = '/static'

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

/*
 * Express config
 */
const cookieSecret = 'aoeuaoeu' // TODO: random

import Express from 'express'
const cookieParser = require('cookie-parser')

const app = Express()
app.set('trust proxy', 'loopback')
app.use(cookieParser(cookieSecret))
app.use(staticDir, Express.static('static'))

var compiler = webpack(config)
//app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
//app.use(webpackHotMiddleware(compiler))

/*
 * Server-side rendering utilities
 */
var needle = require('needle')

import path from 'path'
import { React } from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import masterReducer from './client/reducers'
import * as actions from './client/actions'
import App from './client/containers/App'

function handleRender(req, res, actions = []) {
  const store = createStore(masterReducer)

  // Update state with any actions specified
  actions.forEach((action) => {
    store.dispatch(action)
  })

  // Make the page (broken for now, let the client render. Not sure why.)
  const html = ''
  /*const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )*/

  // Make sure the client has the same state as us
  res.send(renderFullPage(html, store.getState()))
}

function renderFullPage(html, initialState) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>21 Day Fix Fixer</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <!--[if lte IE 8]><script src="${staticDir}/js/ie/html5shiv.js"></script><![endif]-->
      <link rel="stylesheet" href="${staticDir}/css/main.css" />
      <!--[if lte IE 8]><link rel="stylesheet" href="${staticDir}/css/ie8.css" /><![endif]-->
    </head>
    <body>
      <div id="page-wrapper">${html}</div>

      <script>
      window.__INITIAL_STATE = ${JSON.stringify(initialState)}
      </script>
      <script src="${staticDir}/js/bundle.js"></script>

      <!-- TODO bundle these up too -->
      <script src="${staticDir}/js/jquery.min.js"></script>
      <script src="${staticDir}/js/jquery.dropotron.min.js"></script>
      <script src="${staticDir}/js/jquery.scrollgress.min.js"></script>
      <script src="${staticDir}/js/skel.min.js"></script>
      <script src="${staticDir}/js/util.js"></script>
      <!--[if lte IE 8]><script src=".${staticDir}/js/ie/respond.min.js"></script><![endif]-->
      <script src="${staticDir}/js/main.js"></script>
    </body>
  </html>
  `
}

/*
 * Routes
 */
app.use(function(req, res) {
  let acts = [actions.gotoPage(req.path)]

  // If they have a session cookie, try to restore their profile info
  if(req.cookies.sid) {
    console.log(req.cookies)
    acts.push(actions.restoreSession(req.cookies.sid))
  }

  // Special case page?
  switch(req.path) {
    case '/verify':
      handleVerify(req, res, acts)
      break

    default:
      handleRender(req, res, acts)
  }
})

function handleVerify(req, res, acts) {
  var data = req.query
  needle.request('get', 'http://fixsimple_proxy_1/api/v1/users/verify?', data, function (error, response, body) {
    acts.push(actions.gotoLogin())

    if (!error && response.statusCode == 200) {
      // We got an answer, was it positive?
      acts.push(actions.setPageMessage(body.msg))
    } else {
      if(!error) {
        console.log('Unable to reach api server: response ' + response.statusCode)
      } else {
        console.log('Unable to reach api server: error ' + error)
      }
      acts.push(actions.setPageMessage('Unable to reach API server to verify your account. Please try again later.'))
    }

    // Render
    handleRender(req, res, acts)
  })
}

// Settings check
if(staticDir.endsWith('/')) {
  throw "staticDir must not end with '/'"
}

// Listen
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s.", port)
  }
})

