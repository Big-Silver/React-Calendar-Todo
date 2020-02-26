import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { CalendarActionTypes } from "./types";
import { fetchError, fetchSuccess } from "./actions";
import callApi from "../../utils/callApi";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://api.opendota.com";
class Calendar {
  title: string;
  allDay: boolean;
  start: Date;
  endDate: Date;
  desc: string;
  resourceId?: string;
  tooltip?: string;

  constructor(title: string, start: Date, endDate: Date, allDay?: boolean, desc?: string, resourceId?: string) {
    this.title = title;
    this.allDay = allDay || false;
    this.start = start;
    this.endDate = endDate;
    this.desc = desc || "";
    this.resourceId = resourceId;
  }
}

function* handleFetch() {
  try {
    // To call async functions, use redux-saga"s `call()`.
    // const res = yield call(callApi, "get", API_ENDPOINT, "/heroStats");

    // if (res.error) {
    //   yield put(fetchError(res.error));
    // } else {
    //   yield put(fetchSuccess(res));
    // }
    const data: Calendar[] = [
      new Calendar("All Day Event", new Date(2020, 3, 0), new Date(2020, 3, 0), true),
      new Calendar("Long Event", new Date(2020, 3, 7), new Date(2020, 3, 10)),
      new Calendar("DTS STARTS", new Date(2020, 2, 13, 0, 0, 0), new Date(2020, 2, 20, 0, 0, 0)),
      new Calendar("DTS ENDS", new Date(2020, 2, 6, 0, 0, 0), new Date(2020, 2, 13, 0, 0, 0)),
      new Calendar("Some Event", new Date(2020, 3, 9, 0, 0, 0), new Date(2020, 3, 9, 0, 0, 0)),
      new Calendar("Conference", new Date(2020, 3, 11), new Date(2020, 3, 13), undefined, "Big conference for important people"),
      new Calendar("Meeting", new Date(2020, 3, 12, 10, 30, 0, 0), new Date(2020, 3, 12, 12, 30, 0, 0), undefined, "Pre-meeting meeting, to prepare for the meeting"),
      new Calendar("Lunch", new Date(2020, 3, 12, 12, 0, 0, 0), new Date(2020, 3, 12, 13, 0, 0, 0), undefined, "Power lunch"),
      new Calendar("Meeting", new Date(2020, 3, 12, 14, 0, 0, 0), new Date(2020, 3, 12, 15, 0, 0, 0)),
      new Calendar("Happy Hour", new Date(2020, 3, 12, 17, 0, 0, 0), new Date(2020, 3, 12, 17, 30, 0, 0), undefined, "Most important meal of the day"),
      new Calendar("Dinner", new Date(2020, 3, 12, 20, 0, 0, 0), new Date(2020, 3, 12, 21, 0, 0, 0)),
      new Calendar("Birthday Party", new Date(2020, 3, 13, 7, 0, 0), new Date(2020, 3, 13, 10, 30, 0)),
      new Calendar("Alice\"s break", new Date(2020, 3, 14, 20, 0, 0, 0), new Date(2020, 3, 14, 21, 0, 0, 0), undefined, undefined, "alice"),
      new Calendar("Bob\"s break", new Date(2020, 3, 15, 7, 0, 0), new Date(2020, 3, 15, 10, 30, 0), undefined, undefined, "bob"),
    ];
    yield put(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError("An unknown error occured."));
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(CalendarActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* calendarSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default calendarSaga;
