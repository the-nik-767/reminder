import axios from "axios";
import { Platform } from "react-native";

// Enum for HTTP Status Codes
export enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNACCEPTABLE = 406,
  METHOD_NOT_ALLOWED = 405,
  ALREADY_EXISTS = 409,
  CONFLICT = 408,
  VERSION_OUT_OF_DATE = 418,
  SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  NETWORK_CONNECT_TIMEOUT = 599,
}

// Base URL ko environment ke according set karein
const baseURL = __DEV__ 
  ? Platform.select({
      android: 'http://10.0.2.2:3000/api/v1',  // Android Emulator
      ios: 'http://localhost:3000/api/v1',      // iOS Simulator
    })
  : 'YOUR_PRODUCTION_API_URL';

// Create Axios instance with default headers
const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
});

// Function to get token and set it in headers
// async function setAuthHeader() {
//   let token: string | null = null;

//   const jsonValue = await AsyncStorage.getItem('USER_DATA');
//   const data = jsonValue != null ? JSON.parse(jsonValue) : null;

//   token = data?.token || null;

//   if (token) {
//     http.defaults.headers.common['token'] = `${token}`;
//     console.log('Token set in headers:', token);
//   } else {
//     delete http.defaults.headers.common['token'];
//     console.log('Token removed from headers');
//   }
// }

// Ensure setAuthHeader completes before making requests
// async function initialize() {
//   await setAuthHeader();
// }

// initialize();

export default http;
