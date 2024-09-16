import axios from 'axios'

// Clase encargada de realizar request (CRUD) a los endpoints de reservas

const API_URL = 'https://http://localhost:8080/reservas' 

export const getReservas = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getReservaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const createReserva = async (reservaData) => {
  const response = await axios.post(API_URL, reservaData)
  return response.data
}

export const updateReserva = async (id, reservaData) => {
  const response = await axios.put(`${API_URL}/${id}`, reservaData)
  return response.data
}

export const cancelReserva = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}