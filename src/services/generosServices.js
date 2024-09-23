import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchGeneros = async () => {
  try {
    const response = await fetch(`${API_URL}/generos`)
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
    const response = await axios.post(`${API_URL}/generos`, { genero: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGenero = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/generos/${data.id}`, { genero: data.genero });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGenero = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/generos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};