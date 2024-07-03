import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api/v1`,
    withCredentials: true
})

const get = async (url: string, headers = {}, params = {}) => {
    const response = await axiosInstance.get(
        url,
        _generateParams(headers, params)
    )
    return response?.data
}

const post = async (url: string, data = {}, headers = {}, params = {}) => {
    const response = await axiosInstance.post(
        url,
        data,
        _generateParams(headers, params)
    )
    return response?.data
}

const patch = async (url: string, data = {}, headers = {}, params = {}) => {
    const response = await axiosInstance.put(
        url,
        data,
        _generateParams(headers, params)
    )
    return response?.data
}

const destoy = async (url: string, headers = {}, params = {}) => {
    const response = await axiosInstance.delete(
        url,
        _generateParams(headers, params)
    )
    return response?.data
}


// This function will be used to generate the headers and params for each request
const _generateParams = (headers = {}, params = {}) => {
    
    const localHeader = {
    //   Authorization: authToken, implemeted in backend
      ...headers
    }
  
    return {
      headers: localHeader,
      params
    }
}

export default {
    get,
    post,
    patch,
    destoy
}