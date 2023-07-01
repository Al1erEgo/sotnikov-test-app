import axios from 'axios'

export const commonInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})
