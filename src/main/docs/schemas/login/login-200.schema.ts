export const loginSuccessSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
  },
  example: {
    accessToken: 'skd@#$sdfj@$#dskjfdkjf@#idfjsf9ojvm645823#df',
    id: 'AKDFdkfj324dWEWEFk'
  },
  required: ['accessToken']
}