import { AppDispatch } from '../../app/store';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { login as loginApi } from '../../services/auth';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    const data = await loginApi(email, password);
    localStorage.setItem('accessToken', data.token);
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure(error.toString()));
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('accessToken');
  dispatch(logout());
};
