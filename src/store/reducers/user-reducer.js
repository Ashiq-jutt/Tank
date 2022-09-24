import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    // demoAsync: (state, action) => {
    //   state.userInfo = action.payload
    // },
  },
})
// Action creators are generated for each case reducer function
export const { 
  setUserInfo,
  // demoAsync
 } = userSlice.actions

// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default userSlice.reducer