import {
  signUpPath,
  loginPath,
  updateAccountPath,
  updateRestaurantPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/accounts/update': updateAccountPath,
  '/restaurants/:restaurantId/update': updateRestaurantPath,
}