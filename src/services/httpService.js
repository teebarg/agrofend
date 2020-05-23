import { AxiosHttp } from '../helpers/axios';
import { ApiEndPoint } from '../helpers/apiHelper';
import {Utility} from '../util/utility';

export class HttpService {
  static async getMarkets (payload='') {
    try {
      return await AxiosHttp.get(ApiEndPoint.MARKET + Utility.getQueryParams(payload))
    } catch (err) {
      throw err
    }
  }

  static async getMarket (id) {
    try {
      return await AxiosHttp.get(ApiEndPoint.MARKET + '/' + id)
    } catch (err) {
      throw err
    }
  }

  static async addMarket (payload) {
    try {
      return await AxiosHttp.post(ApiEndPoint.MARKET, payload)
    } catch (err) {
      throw err
    }
  }

  static async updateMarket (id, payload) {
    try {
      return await AxiosHttp.put(ApiEndPoint.MARKET + '/' + id, payload)
    } catch (err) {
      throw err
    }
  }

  static async deleteMarket (id) {
    try {
      return await AxiosHttp.delete(ApiEndPoint.MARKET + '/' + id)
    } catch (err) {
      throw err
    }
  }

  static async getCatefories () {
    try {
      return await AxiosHttp.get(ApiEndPoint.CATEGORY)
    } catch (err) {
      throw err
    }
  }
  
  static async addImage (payload) {
    try {
      return await AxiosHttp.post(ApiEndPoint.IMAGE, payload)
    } catch (err) {
      throw err
    }
  }

  static async editImage ({id, payload}) {
    try {
      return await AxiosHttp.put(ApiEndPoint.IMAGE + '/' + id, {image: payload})
    } catch (err) {
      throw err
    }
  }

  static async deleteImage (id) {
    try {
      return await AxiosHttp.delete(ApiEndPoint.IMAGE + '/' + id)
    } catch (err) {
      throw err
    }
  }

  static async login (payload) {
    try {
      return await AxiosHttp.post(ApiEndPoint.AUTH + '/login', payload)
    } catch (err) {
      throw err
    }
  }

}
