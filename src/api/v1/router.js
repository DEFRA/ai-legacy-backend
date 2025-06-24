import { countyRoutes } from './routes/county-routes.js'
import { cphRoutes } from './routes/cph-routes.js'
import { caseRoutes } from './routes/case-routes.js'

export const tbcmsRouter = {
  name: 'tbcms-api',
  version: '1.0.0',
  register: async (server) => {
    // Register all routes
    server.route([
      ...countyRoutes,
      ...cphRoutes,
      ...caseRoutes
    ])
  }
}
