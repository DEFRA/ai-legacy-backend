import { routes as healthRoutes } from './health/routes.js'

const probes = {
  plugin: {
    name: 'probes',
    async register (server) {
      server.route(healthRoutes)
    }
  }
}

export {
  probes
}
