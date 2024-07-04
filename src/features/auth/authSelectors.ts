import { RootState } from '../../app/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthRegister = (state: RootState) => state.auth.errorRegister;
export const selectSuccessRegister = (state: RootState) => state.auth.successRegister;
