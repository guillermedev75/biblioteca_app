import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEstoque = async () => {
  try {
    const response = await fetch(`${API_URL}/livros/estoque`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os estoque');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createEstoque = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/livros/estoque`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEstoque = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/livros/estoque/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEstoque = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/livros/estoque/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};