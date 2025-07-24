import { routes as holdingRoutes } from './holdings/routes.js'

const v1 = {
  plugin: {
    name: 'v1-api',
    async register (server) {
      server.route(holdingRoutes)
    }
  }
}

export {
  v1
}
