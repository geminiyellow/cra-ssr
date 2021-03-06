import http from 'http'
import { api, error } from './middlewares'
import { chain } from './util'

const envSpecificMiddlewares = []

if (process.env.NODE_ENV === 'production') {
  const serveStatic = require('serve-static')
  const { prerenderClient } = require('./prerenderClient')

  envSpecificMiddlewares.push(
    serveStatic('public'),
    prerenderClient()
  )
}

const middlewares = [
  api,
  ...envSpecificMiddlewares,
  error
]

const server = http.createServer(chain(middlewares))

server.listen(process.env.PORT || 3000)
