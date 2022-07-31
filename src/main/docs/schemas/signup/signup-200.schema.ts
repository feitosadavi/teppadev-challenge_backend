export const signupSuccessSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    }
  },
  example: {
    accessToken: 'skd@#$sdfj@$#dskjfdkjf@#idfjsf9ojvm645823#df'
  },
  required: ['accessToken']
}