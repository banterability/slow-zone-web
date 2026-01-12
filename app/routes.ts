import { type RouteConfig } from "@remix-run/dev/routes";
import { flatRoutes } from "@remix-run/fs-routes";

export default flatRoutes() satisfies RouteConfig;
