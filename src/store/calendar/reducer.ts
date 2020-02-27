import { Reducer } from "redux";
import { CalendarState, CalendarActionTypes } from "./types";

// Type-safe initialState!
const initialState: CalendarState = {
  data: [
    {
      title: "Interview",
      allDay: false,
      start: new Date(2020, 1, 26, 12, 30, 0),
      end: new Date(2020, 1, 26, 12, 30, 0),
      companyName: "Amazon",
      companyCity: "seattle",
      companyStreet: "world street",
      comments: "no comments"
    },
  ],
  errors: undefined,
  loading: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<CalendarState> = (state = initialState, action) => {
  switch (action.type) {
    case CalendarActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case CalendarActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CalendarActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case CalendarActionTypes.UPDATE_EVENT: {
      return { ...state, loading: false, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as calendarReducer };
