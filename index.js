/* global require, process, __dirname */
/* eslint no-console: off */
const express = require('express')
const next = require('next')
const favicon = require('serve-favicon')
const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 3100

const dev = process.env.NODE_ENV === 'development'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const server = express()

app.prepare()
  .then(() => {
    return new Promise((resolve) => {
    // XXX in here I can do setup
      return resolve()
    })
  })
  .then(() => {
    server.use(favicon(path.join(__dirname, 'public', 'static', 'images', 'favicons', 'favicon.ico')))

    server.get('/country/:countryCode', (req, res) => {
      return app.render(req, res, '/country', req.params)
    })

    server.get('/measurement/:report_id', (req, res) => {
      const combinedQuery = {...req.params, ...req.query}
      return app.render(req, res, '/measurement', combinedQuery)
    })

    // Default catch all
    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' +
    process.env.PORT +
    ' [' + process.env.NODE_ENV + ']')
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
