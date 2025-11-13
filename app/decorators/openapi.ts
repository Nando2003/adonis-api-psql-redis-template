import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@foadonis/openapi/decorators'

interface ParamConfig {
  name: string
  in?: 'path' | 'query'
  required?: boolean
  type?: any
  schema?: any
  description?: string
  example?: any
}

interface ResponseConfig {
  status: number
  type?: any
  schema?: any
}

export function Openapi(
  summary: string,
  optns?: { body?: any; params?: ParamConfig[]; responses?: ResponseConfig[]; secure?: boolean }
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary })(target, propertyKey, descriptor)

    if (optns?.secure) {
      ApiBearerAuth()(target, propertyKey)
    }

    if (optns) {
      if (optns.body) {
        ApiBody({ type: optns.body })(target, propertyKey, descriptor)
      }

      if (optns.params?.length) {
        optns.params.forEach((param) => {
          const decoratorOptions = {
            name: param.name,
            required: param.required ?? false,
            description: param.description,
            example: param.example,
            type: param.type,
            schema: param.schema,
          }

          if (param.in === 'query') {
            ApiQuery(decoratorOptions)(target, propertyKey)
          } else {
            ApiParam(decoratorOptions)(target, propertyKey)
          }
        })
      }

      if (optns.responses?.length) {
        optns.responses.forEach((response) => {
          if (response.type) {
            ApiResponse({
              status: response.status,
              type: typeof response.type === 'function' ? response.type : () => response.type,
            })(target, propertyKey)
          } else if (response.schema) {
            ApiResponse({
              status: response.status,
              schema: response.schema,
            })(target, propertyKey)
          }
        })
      }
    }
  }
}
