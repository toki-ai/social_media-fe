import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: baseURL,
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login' 
    }
    return Promise.reject(error)
  }
)

export const apiCaller = {
  get: <T>(
    url: string,
    params = {},
    config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
  ): Promise<T> => api.get(url, { params, ...config }).then((res) => res.data),

  post: <T>(
    url: string,
    data = {},
    config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
  ): Promise<T> => api.post(url, data, { ...config }).then((res) => res.data),

  put: <T>(
    url: string,
    data = {},
    config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
  ): Promise<T> => api.put(url, data, { ...config }).then((res) => res.data),

  delete: <T>(
    url: string,
    config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
  ): Promise<T> => api.delete(url, { ...config }).then((res) => res.data),
}
