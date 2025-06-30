import { tbRoutes } from './endpoints/tb.js'
import { allocationRoutes } from './endpoints/allocation.js'

/**
 * All reference routes - combines all reference endpoint routes
 */
const referenceRoutes = [
  ...tbRoutes,
  ...allocationRoutes
]

export { referenceRoutes }
