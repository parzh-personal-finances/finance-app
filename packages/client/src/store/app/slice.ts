import { createSlice } from '@reduxjs/toolkit'

/** @private */
interface State {
  loading: boolean
}

/** @private */
const initialState: State = {
  loading: true,
}

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // "story" actions rather than setters
    startLoading(state) {
      state.loading = true
    },

    stopLoading(state) {
      state.loading = false
    },
  },
})
