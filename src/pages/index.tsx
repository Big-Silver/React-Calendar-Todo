import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";
import { Calendar, View, DateLocalizer, momentLocalizer, Views } from "react-big-calendar";

import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import styled from "../utils/styled";
import { IApplicationState, IConnectedReduxProps } from "../store";
import { fetchRequest } from "../store/calendar/actions";
import { ICalendar } from "../store/calendar/types";

interface IPropsFromState {
  loading: boolean;
  errors?: string;
  data: ICalendar[];
}

interface IPropsFromDispatch {
  fetchRequest: typeof fetchRequest;
}

interface IState {
  title: string;
  start: string;
  time: string;
  companyName: string;
  companyStreet: string;
  companyCity: string;
  comments: string;
  isEvent: boolean;
  events: ICalendar[];
  selectedEventNum: number;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps;

class IndexPage extends React.Component<AllProps, IState> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      title: "",
      start: "",
      time: "",
      companyName: "",
      companyStreet: "",
      companyCity: "",
      comments: "",
      isEvent: false,
      events: [
        {
          title: "All Day Event very long title",
          allDay: false,
          start: new Date(2020, 1, 26, 12, 30, 0),
          end: new Date(2020, 1, 26, 12, 30, 0),
          companyName: "Amazon",
          companyCity: "seattle",
          companyStreet: "world street",
          comments: "no comments"
        },
      ],
      selectedEventNum: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleCompanyStreetChange = this.handleCompanyStreetChange.bind(this);
    this.handleCompanyCityChange = this.handleCompanyCityChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);

    this.selectEvent = this.selectEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);

    this.addEvent = this.addEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.cancelEvent = this.cancelEvent.bind(this);
  }

  public componentDidMount() {
    const { data } = this.props;

    if (data.length === 0) {
      this.props.fetchRequest();
    }
  }

  handleSubmit = () => {
    console.log("form : ", this.state);
  }

  handleDateChange = (event: any) => {
    this.setState({ start: event.target.value });
  }

  handleTimeChange = (event: any) => {
    this.setState({ time: event.target.value });
  }

  handleTitleChange = (event: any) => {
    this.setState({ title: event.target.value });
  }

  handleCompanyNameChange = (event: any) => {
    this.setState({ companyName: event.target.value });
  }

  handleCompanyStreetChange = (event: any) => {
    this.setState({ companyStreet: event.target.value });
  }

  handleCompanyCityChange = (event: any) => {
    this.setState({ companyCity: event.target.value });
  }

  handleCommentsChange = (event: any) => {
    this.setState({ comments: event.target.value });
  }

  selectEvent = (eventInfo: any) => {
    const e  = this.state.events;
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < e.length; i++) {
      if (moment(e[i].start).format("YYYY-MM-DD") === moment(eventInfo.start).format("YYYY-MM-DD")) {
        this.setState({
          isEvent: true,
          title: eventInfo.title,
          start: moment(eventInfo.start).format("YYYY-MM-DD"),
          time: moment(eventInfo.start).format("HH:mm:ss"),
          companyName: eventInfo.companyName,
          companyCity: eventInfo.companyCity,
          companyStreet: eventInfo.companyStreet,
          comments: eventInfo.comments,
          selectedEventNum: i
        });
      }
    }
  }

  selectSlot = (slotInfo: any) => {
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < this.state.events.length; i++) {
      if (moment(this.state.events[i].start).format("YYYY-MM-DD") === moment(slotInfo.start).format("YYYY-MM-DD")) {
        this.setState({ isEvent: true });
        this.selectEvent(this.state.events[i]);
        return;
      }
    }
    this.setState({
      isEvent: false,
      start: moment(slotInfo.start).format("YYYY-MM-DD"),
      time: moment(slotInfo.start).format("HH:mm:ss"),
      title: "",
      companyName: "",
      companyCity: "",
      companyStreet: "",
      comments: ""
    });
  }

  addEvent = () => {
    // tslint:disable-next-line:one-variable-per-declaration
    const e  = this.state.events,
      year   = parseInt(moment(this.state.start).format("YYYY"), 10),
      month  = parseInt(moment(this.state.start).format("MM"), 10) - 1,
      day    = parseInt(moment(this.state.start).format("DD"), 10),
      hour   = parseInt(moment(`${this.state.start} ${this.state.time}`).format("HH"), 10),
      minute = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10),
      second = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10);
    e.push({
      title: this.state.title,
      allDay: false,
      start: new Date(year, month, day, hour, minute, second),
      end: new Date(year, month, day, hour, minute, second),
      companyName: this.state.companyName,
      companyCity: this.state.companyCity,
      companyStreet: this.state.companyStreet,
      comments: this.state.comments
    });
    this.setState({ events: e, isEvent: true });
  }

  editEvent = () => {
    // tslint:disable-next-line:one-variable-per-declaration
    const e  = this.state.events,
      year   = parseInt(moment(this.state.start).format("YYYY"), 10),
      month  = parseInt(moment(this.state.start).format("MM"), 10) - 1,
      day    = parseInt(moment(this.state.start).format("DD"), 10),
      hour   = parseInt(moment(`${this.state.start} ${this.state.time}`).format("HH"), 10),
      minute = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10),
      second = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10);
    e[this.state.selectedEventNum].title = this.state.title;
    e[this.state.selectedEventNum].start = new Date(year, month, day, hour, minute, second);
    e[this.state.selectedEventNum].end = new Date(year, month, day, hour, minute, second);
    e[this.state.selectedEventNum].companyName = this.state.companyName;
    e[this.state.selectedEventNum].companyStreet = this.state.companyStreet;
    e[this.state.selectedEventNum].companyCity = this.state.companyCity;
    e[this.state.selectedEventNum].comments = this.state.comments;
    this.setState({ events: e });
  }

  removeEvent = () => {
    const e  = this.state.events;
    // console.log(this.state.events.splice(this.state.selectedEventNum, 1))
    e.splice(this.state.selectedEventNum, 1);
    this.setState({
      time: "",
      title: "",
      companyName: "",
      companyCity: "",
      companyStreet: "",
      comments: "",
      events: e,
      isEvent: false
    });
  }

  cancelEvent = () => {
    const e  = this.state.events;
    // console.log(this.state.events.splice(this.state.selectedEventNum, 1))
    e.splice(this.state.selectedEventNum, 1);
    this.setState({
      events: e,
      isEvent: false
    });
  }

  public render() {
    const { data } = this.props;

    return (
      <Page>
        <Container>
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-md-6 col-sm-12">
                <form>
                  <FormLabel>
                    Date:
                    <input type="date" value={this.state.start} onChange={this.handleDateChange} />
                  </FormLabel>
                  <FormLabel>
                    Time:
                    <input type="time" value={this.state.time} onChange={this.handleTimeChange} />
                  </FormLabel>
                  <FormLabel>
                    Job Title:
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                  </FormLabel>
                  <FormLabel>
                    Company Name:
                    <input type="text" value={this.state.companyName} onChange={this.handleCompanyNameChange} />
                  </FormLabel>
                  <FormLabel>
                    Company Street:
                    <input type="text" value={this.state.companyStreet} onChange={this.handleCompanyStreetChange} />
                  </FormLabel>
                  <FormLabel>
                    Company City:
                    <input type="text" value={this.state.companyCity} onChange={this.handleCompanyCityChange} />
                  </FormLabel>
                  <FormLabel>
                    Comments:
                    <textarea rows={5} value={this.state.comments} onChange={this.handleCommentsChange} />
                  </FormLabel>
                  {this.state.isEvent ?
                    (<div>
                      <button className="btn btn-primary" onClick={this.editEvent}>Edit</button>
                      <button className="btn btn-danger" onClick={this.removeEvent}>Remove</button>
                      <button className="btn btn-warning" onClick={this.cancelEvent}>Cancel</button>
                    </div>)
                    :
                    (<button className="btn btn-success" onClick={this.addEvent}>Add</button>)}
                </form>
              </div>
              <div className="col-xs-6 col-md-6 col-sm-12">
                <Calendar
                  events={this.state.events}
                  defaultView={"month"}
                  views={["day", "week", "month"]}
                  step={60}
                  showMultiDayTimes={true}
                  defaultDate={new Date(2020, 1, 1)}
                  localizer={localizer}
                  selectable={true}
                  onSelectEvent={event => this.selectEvent(event)}
                  onSelectSlot={slotInfo => this.selectSlot(slotInfo)}
                />
              </div>
            </div>

          </div>
        </Container>
      </Page>
    );
  }
}

// It"s usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ calendar }: IApplicationState) => ({
  loading: calendar.loading,
  errors: calendar.errors,
  data: calendar.data
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);

const localizer = momentLocalizer(moment);

const FormLabel = styled("label")`
  width: 100%;
`;
