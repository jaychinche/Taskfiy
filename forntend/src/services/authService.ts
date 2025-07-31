import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};