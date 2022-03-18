import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Helpdesk API',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs de Login'
  }, {
    name: 'Ticket',
    description: 'APIs de Ticket'
  },
  {
    name: 'Message',
    description: 'APIs de Mensagens'
  }],
  paths,
  schemas,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
