import { combineReducers, Dispatch, Action, AnyAction } from "redux";
import { all, fork } from "redux-saga/effects";

import { LayoutState, layoutReducer } from "./layout";

import heroesSaga from "./heroes/sagas";
import { HeroesState } from "./heroes/types";
import { heroesReducer } from "./heroes/reducer";

import teamsSaga from "./teams/sagas";
import { TeamsState } from "./teams/types";
import { teamsReducer } from "./teams/reducer";

import calendarSaga from "./calendar/sagas";
import { CalendarState } from "./calendar/types";
import { calendarReducer } from "./calendar/reducer";

// The top-level state object
export interface IApplicationState {
  layout: LayoutState;
  heroes: HeroesState;
  teams: TeamsState;
  calendar: CalendarState;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<IApplicationState>({
  layout: layoutReducer,
  heroes: heroesReducer,
  teams: teamsReducer,
  calendar: calendarReducer
});

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(heroesSaga), fork(teamsSaga), fork(calendarSaga)]);
}
