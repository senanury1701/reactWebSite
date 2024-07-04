import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser as registerUserService } from '../../services/auth'; // Corrected import path

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    successRegister: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    successRegister: false,
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSuccessRegister(state) {
            state.successRegister = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successRegister = false;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.successRegister = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.successRegister = false;
            });
    },
});

export const { resetSuccessRegister } = authSlice.actions;

export default authSlice.reducer;
