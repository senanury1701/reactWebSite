import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

interface RegisterData {
    email: string;
    password: string;
    name: string;
    lastName: string;
}

interface RegisterResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

export const registerUser = async (userData: { email: string; name: string; lastName: string; password: string }) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        throw new Error('Register failed');
    }
};

export const login = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await api.post('/login', data); 
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};
