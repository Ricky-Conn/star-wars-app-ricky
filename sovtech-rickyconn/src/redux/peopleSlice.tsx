import { createSlice } from '@reduxjs/toolkit'

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    value: {}
  },
  reducers: {
    setPeople(state, action){
      return {value: action.payload}
    }
  }
})

export const { setPeople } = peopleSlice.actions

export default peopleSlice.reducer