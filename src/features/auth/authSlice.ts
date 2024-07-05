import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser as registerUserService } from '../../services/auth'; // Corrected import path
import { login as loginApi } from '../../services/auth';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    errorRegiste: string | null;
    successRegister: boolean;
    isAuthenticated: boolean;
    
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    errorRegiste: null,
    successRegister: false,
    isAuthenticated: false
    
};



export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { email: string; name: string; lastName: string; password: string }, thunkAPI) => {
        try {
            const response = await registerUserService(userData);          
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
      try {       
          const response = await loginApi(email.value, password.value);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      }
  }
);

export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (_, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const isAuthenticated = !!accessToken;          
            return isAuthenticated;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSuccessRegister(state) {
            state.successRegister = false;
            state.errorRegister = null;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true
         
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false

            
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.errorRegister = null; 
                state.successRegister = false;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.successRegister = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.errorRegister = action.payload as string; 
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuthState.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload; 
            })
            .addCase(checkAuthState.rejected, (state) => {
                state.isAuthenticated = false; 
                
            });

        }
});

export const { resetSuccessRegister, loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
