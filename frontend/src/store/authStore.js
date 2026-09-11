import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  login: async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      set({ userInfo: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },
  register: async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/users/register', { name, email, password });
      set({ userInfo: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },
  logout: async () => {
    try {
      await axios.post('/api/users/logout');
      set({ userInfo: null });
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Logout error', error);
    }
  },
}));

export default useAuthStore;
