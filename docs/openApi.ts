export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "1.0.0",
  },
  paths: {
    "/api/v1/users": {
      get: {
        summary: "Get all users",
        responses: {
          200: { description: "OK" },
          500: { description: "Internal Server Error" },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid", example: "550e8400-e29b-41d4-a716-446655440000" },
          },
        ],
        responses: {
          200: { description: "OK" },
          400: { description: "Bad Request" },
          404: { description: "Not Found" },
          500: { description: "Internal Server Error" },
        },
      },
    },
  },
};
