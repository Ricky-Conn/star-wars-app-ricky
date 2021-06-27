import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './peopleSlice'
import pageReducer from './pageSlice'
import selectedPersonReducer from './selectedPersonSlice'

export default configureStore({
    reducer: {
      people: peopleReducer,
      page: pageReducer,
      selectedPerson: selectedPersonReducer
    }
})