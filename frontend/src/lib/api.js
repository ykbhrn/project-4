import axios from 'axios'
// import { getToken } from './auth'

// const withHeaders = () => {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   }
// }

export const getAllImages = () => {
  return axios.get('/api/images')
}

export const getSingleImage = id => {
  return axios.get(`/api/images/${id}`)
}

export const getAllVideos = () => {
  return axios.get('/api/videos')
}

export const getSingleVideo = id => {
  return axios.get(`/api/videos/${id}`)
}