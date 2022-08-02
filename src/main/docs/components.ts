import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
  noContent
} from './components/'

export default {
  // securitySchemes: {
  //   apiKeyAuth: apiKeyAuthSchema
  // },
  noContent,
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}