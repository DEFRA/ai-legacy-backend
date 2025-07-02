import SwaggerParser from "@apidevtools/swagger-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validateOpenAPI() {
  try {
    const apiPath = path.join(__dirname, "public", "openapi.yaml");
    console.log("Validating OpenAPI document:", apiPath);

    const api = await SwaggerParser.validate(apiPath);

    console.log("✅ OpenAPI document is valid!");
    console.log(`API Title: ${api.info.title}`);
    console.log(`API Version: ${api.info.version}`);
    console.log(`OpenAPI Version: ${api.openapi}`);

    // Count endpoints
    const pathCount = Object.keys(api.paths || {}).length;
    let operationCount = 0;

    Object.values(api.paths || {}).forEach((pathItem) => {
      Object.keys(pathItem).forEach((method) => {
        if (
          ["get", "post", "put", "patch", "delete"].includes(
            method.toLowerCase(),
          )
        ) {
          operationCount++;
        }
      });
    });

    console.log(`Total paths: ${pathCount}`);
    console.log(`Total operations: ${operationCount}`);

    // List all operations
    console.log("\nEndpoints discovered:");
    Object.entries(api.paths || {}).forEach(([path, pathItem]) => {
      Object.entries(pathItem).forEach(([method, operation]) => {
        if (
          ["get", "post", "put", "patch", "delete"].includes(
            method.toLowerCase(),
          )
        ) {
          console.log(
            `  ${method.toUpperCase()} ${path} - ${operation.summary || "No summary"}`,
          );
        }
      });
    });
  } catch (error) {
    console.error("❌ OpenAPI document validation failed:");
    console.error(error.message);
    process.exit(1);
  }
}

validateOpenAPI();
