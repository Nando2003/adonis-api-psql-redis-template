import router from '@adonisjs/core/services/router'
import openapi from '@foadonis/openapi/services/main'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

if (process.env.NODE_ENV !== 'production') {
  openapi.registerRoutes()
}
