import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      'Content-Type': 'application/json',
  },
});


  interface LoginResponse {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken:string;
}

export const registerUser = async (userData: { email: string; name: string; lastName: string; password: string }) => {
    try {
        const response = await api.post('users', userData);       
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const data= {
        email : email,
        password: password
      }
      const response = await api.post('login', data );
      localStorage.setItem('accessToken', response.data.accessToken);
      
      return response.data;
    } catch (error) {
      
      throw new Error(error.response.data);
    }
  }

export const logout = async () => {
  try {
    const response = await api.post('logout');
    localStorage.removeItem('accessToken');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

