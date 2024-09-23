import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchClientes = async () => {
  try {
    const response = await fetch(`${API_URL}/clientes`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os clientes');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createClientes = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/clientes`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClientes = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/clientes/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClientes = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clientes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};