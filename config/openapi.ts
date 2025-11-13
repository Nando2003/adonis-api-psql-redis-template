import { defineConfig } from '@foadonis/openapi'

export default defineConfig({
  ui: 'swagger',
  document: {
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
    },
    security: [
      {
        bearer: [],
      },
    ],
  },
})
