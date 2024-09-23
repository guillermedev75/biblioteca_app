import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export const fetchLivros = async () => {
  console.log(API_URL)
  try {
    const response = await fetch(`${API_URL}/livros`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os livros');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createLivros = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/livros`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLivros = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/livros/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLivros = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/livros/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};