import { router as referenceRouter } from './reference/router.js'

export const tbcmsRouter = {
  name: 'tbcms-api',
  version: '1.0.0',
  async register (server) {
    // Register domain-specific routers
    await server.register([
      referenceRouter
    ])
  }
}
