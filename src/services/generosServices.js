import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

export const fetchGeneros = async () => {
  try {
    // const response = await fetch(`${API_URL}/generos`)
    const response = await fetch(`http://127.0.0.1:8000/generos`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os gêneros');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createGenero = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/generos', { genero: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGenero = async (data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/generos/${data.id}`, { genero: data.genero });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGenero = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/generos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};