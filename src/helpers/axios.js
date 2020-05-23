import axios from "axios";
import { Utility } from "../util/utility";

// export class AxiosHttp {
//     static api = process.env.REACT_APP_API_DOMAIN;
//   static get(url, params='') {
//       return axios.get(this.api + url + params);
//     }

//    static post(url, payload) {
//       return axios.post(this.api + url, payload);
//     }
// }
axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;

export class AxiosHttp {
    // axios.defaults.baseURL = 'https://api.example.com';
  static get (url, params = '') {
    return axios.get(url + Utility.getQueryParams(params))
  }
  static post (url, payload) {
    return axios.post(url, payload)
  }
  static put (url, payload) {
    return axios.put(url, payload)
  }
  static patch (url, payload) {
    return axios.patch(url, payload)
  }
  static delete (url) {
    return axios.delete(url)
  }
}
