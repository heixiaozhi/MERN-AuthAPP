import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

// 从localStorage中获取user
const user = JSON.parse(localStorage.getItem('user'))

// 用户注册
export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// 用户登陆
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  await authService.logout()
})

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
