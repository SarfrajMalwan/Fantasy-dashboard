// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'

// import counterReducer from 'src/features/counter/counterSlice'
// import loaderReducer from 'src/features/loader/loaderSlice'
// import authReducer from 'src/features/auth/authSlice'




export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    // counter: counterReducer,
    // loader: loaderReducer,
    // auth: authReducer,
    // competitions: competitionsReducer,
    // seasons: seasonsReducer,
    // venues: venuesReducer,
    // rounds: roundsReducer,

    // countries: countriesReducer,
    // players: playersReducer,
    // teams: teamsReducer,

    // competitionsteamplayer: competitionsteamplayerReducer,
    // constant: constantReducer,
    // faqs: faqsReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
