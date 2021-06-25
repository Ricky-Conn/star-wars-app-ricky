import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './peopleSlice'
import pageReducer from './pageSlice'

export default configureStore({
    reducer: {
      people: peopleReducer,
      page: pageReducer
    }
})