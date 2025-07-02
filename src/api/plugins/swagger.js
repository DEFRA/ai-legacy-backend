import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import path from "path";
import { config } from "../../config/index.js";

export const swaggerPlugin = {
  name: "swagger",
  version: "1.0.0",
  register: async (server) => {
    const swaggerOptions = {
      info: {
        title: "TBCMS API Documentation",
        version: "1.0.0",
        description: "Tuberculosis Case Management System API",
        contact: {
          name: "TBCMS Development Team",
          email: "tbcms-dev@example.com",
        },
      },
      schemes: ["http", "https"],
      host: "localhost:3002",
      basePath: "/",
      pathPrefixSize: 2,
      documentationPath: "/docs",
      swaggerUI: true,
      swaggerUIPath: "/swagger/",
      jsonPath: "/swagger.json",
      tags: [
        {
          name: "Counties",
          description: "County management operations",
        },
        {
          name: "CPH",
          description: "County Parish Holding management operations",
        },
        {
          name: "Cases",
          description: "TB Case management operations",
        },
        {
          name: "Admin",
          description: "Administrative staff management operations",
        },
        {
          name: "Field Staff",
          description: "Field staff management operations",
        },
      ],
      grouping: "tags",
      sortTags: "alpha",
      sortEndpoints: "alpha",
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);

    // Serve static files from the public directory (custom Swagger UI)
    server.route({
      method: "GET",
      path: "/custom-docs/{param*}",
      handler: {
        directory: {
          path: path.resolve(config.get("root"), "public"),
          index: ["swagger-ui.html"],
        },
      },
    });
  },
};
