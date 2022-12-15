import axios from 'axios'
import { paramsType } from '../models/api-handler.model'

axios.defaults.timeout = 10 * 1000 * 60
//axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error.request || error.message)
)

const apiHandler = {
  /**
   * Make Http Get Request
   * This method is used to fetch data
   * @param url
   * @param body
   */
  get: async (url: string, body?: paramsType) => {
    return await axios.get(url, body)
  },
  /**
   * Make Http Get Request
   * This method is used to fetch data
   * @param url
   */
  getAuth: async (url: string) => {
    return await axios.get(url)
  },
  /**
   * Make Http Post Request
   * This method is used to create new item
   * @param url
   * @param body
   */
  create: async (url: string, body: paramsType, config?: any) => {
    return axios.post(url, body, config)
  },
  /**
   * Make Http Put Request
   * This method is used to update item
   * @param url
   * @param body
   */
  update: async (url: string, body: paramsType, config?: any) => {
    return axios.put(url, body, config)
  },
  /**
   * Make Http Delete Request
   * This method is used to delete item
   * @param url
   */
  delete: async (url: string, body?: paramsType) => {
    return await axios.delete(url, { data: body })
  },
  /**
   * Make Multiple Http Get Requests
   * @param urls
   */
  all: async (urls: Array<string>) => {
    const requests: Array<object> = []
    urls.forEach((url) => {
      requests.push(axios.get(url))
    })
    return await axios.all(requests)
  },
  /**
   * Make Multiple Http Get Requests
   * @param urls
   */
  allDelete: async (urls: Array<string>) => {
    const requests: Array<object> = []
    urls.forEach((url) => {
      requests.push(axios.delete(url))
    })
    return await axios.all(requests)
  },
}
export default apiHandler
