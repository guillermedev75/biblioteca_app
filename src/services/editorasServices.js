import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

export const fetchEditoras = async () => {
  try {
    // const response = await fetch(`${API_URL}/generos`)
    const response = await fetch(`http://127.0.0.1:8000/editoras`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os editoras');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createEditora = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/editoras', { nome: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEditora = async (data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/editoras/${data.id}`, { nome: data.nome });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEditora = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/editoras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};