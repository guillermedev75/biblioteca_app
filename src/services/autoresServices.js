import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

export const fetchAutores = async () => {
  try {
    // const response = await fetch(`${API_URL}/generos`)
    const response = await fetch(`http://127.0.0.1:8000/autores`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os autores');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createAutores = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/autores', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAutores = async (data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/autores/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAutores = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/autores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};