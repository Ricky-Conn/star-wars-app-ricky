import { createSlice } from '@reduxjs/toolkit'

export const selectedPersonSlice = createSlice({
  name: 'selectedPerson',
  initialState: {
    value: null
  },
  reducers: {
    setPerson(state, action){
      return {value: action.payload}
    }
  }
})

export const { setPerson } = selectedPersonSlice.actions

export default selectedPersonSlice.reducer