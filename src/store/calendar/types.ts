export interface ICalendar extends ApiResponse {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  time?: string;
  companyName: string;
  companyStreet?: string;
  companyCity?: string;
  comments?: string;
}

export type ApiResponse = Record<string, any>;

export const enum CalendarActionTypes {
  FETCH_REQUEST = "@@calendar/FETCH_REQUEST",
  FETCH_SUCCESS = "@@calendar/FETCH_SUCCESS",
  FETCH_ERROR = "@@calendar/FETCH_ERROR",
  SELECT_HERO = "@@calendar/SELECT_HERO",
  SELECTED = "@@calendar/SELECTED"
}

export interface CalendarState {
  readonly loading: boolean;
  readonly data: ICalendar[];
  readonly errors?: string;
}
