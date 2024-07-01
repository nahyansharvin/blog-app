import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api/v1`,
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
    console.log("BackendServiceResp Kitty ")
    console.log("BackendServiceResp >> ", response)
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
    // const authToken = getCookie(STORAGE_KEYS.TOKEN);
    const authToken = "token"
    
    const localHeader = {
      Authorization: authToken,
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