import { referenceRoutes } from './reference/router.js'
import { holdingRoutes } from './holding/router.js'

export const tbcmsRouter = {
  name: 'tbcms-api',
  version: '1.0.0',
  async register (server) {
    server.route([...referenceRoutes, ...holdingRoutes])
  },
}
