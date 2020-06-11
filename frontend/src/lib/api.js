import axios from 'axios'
import { getToken } from './auth'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

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

export const getPortfolio = () => {
  return axios.get('/api/profile', withHeaders())
}

export const getPublicPortfolio = id => {
  return axios.get(`/api/profile/${id}`)
}

export const registerUser = formData => {
  return axios.post('/api/register', formData)
}

export const loginUser = formData => {
  return axios.post('/api/login', formData)
}

export const getAllSports = () => {
  return axios.get('/api/sports')
}

export const getAllTrainings = () => {
  return axios.get('/api/trainings')
}

export const addTraining = formData => {
  return axios.post('/api/trainings/', formData, withHeaders())
}

export const bookTraining = id => {
  return axios.put(`/api/trainings/${id}/`, {}, withHeaders())
}

export const addImages = formData => {
  return axios.post('/api/images/', formData, withHeaders())
}

export const addVideos = formData => {
  return axios.post('/api/videos/', formData, withHeaders())
}

export const addArticles = formData => {
  return axios.post('/api/articles/', formData, withHeaders())
}

export const getAllArticles = () => {
  return axios.get('/api/articles')
}

export const getSingleArticle = id => {
  return axios.get(`/api/articles/${id}`)
}
