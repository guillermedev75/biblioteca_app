import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEmprestimos = async () => {
  try {
    const response = await fetch(`${API_URL}/emprestimos`)
    if (!response.ok) {
      throw new Error('Erro ao buscar os emprestimos');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createEmprestimos = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/emprestimos`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmprestimos = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/emprestimos/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const restoreEmprestimo = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/emprestimos/devolucao/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postergarEmprestimo = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/emprestimos/postergar/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmprestimos = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/emprestimos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};