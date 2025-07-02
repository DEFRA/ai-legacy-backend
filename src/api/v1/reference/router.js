import { tbRoutes } from "./endpoints/tb.js";
import { allocationRoutes } from "./endpoints/allocation.js";
import { finishingUnitRoutes } from "./endpoints/finishing-unit.js";

/**
 * All reference routes - combines all reference endpoint routes
 */
const referenceRoutes = [
  ...tbRoutes,
  ...allocationRoutes,
  ...finishingUnitRoutes,
];

export { referenceRoutes };
