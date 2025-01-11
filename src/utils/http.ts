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

// Create Axios instance with default headers

const http = axios.create({
  // Platform specific baseURL
  baseURL: Platform.select({
    android: 'https://vlkrmvfn-3000.inc1.devtunnels.ms/api/v1', // Android Emulator
    ios: 'https://vlkrmvfn-3000.inc1.devtunnels.ms/api/v1', // iOS Simulator
    // Add your production URL when deploying
  }),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
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
