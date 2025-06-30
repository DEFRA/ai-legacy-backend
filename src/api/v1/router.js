import { referenceRoutes } from './reference/router.js'

export const tbcmsRouter = {
  name: 'tbcms-api',
  version: '1.0.0',
  async register (server) {
    // Register all v1 routes
    server.route([
      ...referenceRoutes
      // Add other route arrays here as the API grows
      // ...otherDomainRoutes
    ])
  }
}
