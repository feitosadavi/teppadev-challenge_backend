import {
  signUpParamsSchema,
  signupSuccessSchema,
  signup400Schema,
  loginParamsSchema,
  loginSuccessSchema,
  login400Schema
} from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  signupSuccess: signupSuccessSchema,
  signup400: signup400Schema,

  loginParams: loginParamsSchema,
  loginSuccess: loginSuccessSchema,
  login400: login400Schema
}