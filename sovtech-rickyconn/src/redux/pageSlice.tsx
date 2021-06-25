import { bindActionCreators, createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: 1
  },
  reducers: {
    increment(state, action){
      state.value++
    },
    decrement(state, action){
      state.value--
    },
    setPage(state, action)
    {
      return action.payload
    }
  }
})

export const { increment,decrement,setPage } = pageSlice.actions

export default pageSlice.reducer