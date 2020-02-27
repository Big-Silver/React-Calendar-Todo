import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";

import Page from "../components/layout/Page";
import Container from "../components/layout/Container";
import styled from "../utils/styled";
import { IApplicationState, IConnectedReduxProps } from "../store";
import { fetchRequest, updateEvent } from "../store/calendar/actions";
import { ICalendar } from "../store/calendar/types";

interface IPropsFromState {
  loading: boolean;
  errors?: string;
  data: ICalendar[];
}

interface IPropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  updateEvent: typeof updateEvent;
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
  selectedEventNum: number;
  errors: {
    title: string,
    companyName: string,
    start: string
  };
}

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
      selectedEventNum: 0,
      errors: {
        title: "",
        companyName: "",
        start: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.validForm = this.validForm.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);

    this.addEvent = this.addEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }

  public componentDidMount() {
    const { data } = this.props;

    if (data.length === 0) {
      this.props.fetchRequest();
    }
  }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    const errors = this.state.errors;
    switch (name) {
      case "title":
        errors.title =
          value.length < 1
            ? "The title is required."
            : "";
        break;
      case "companyName":
        errors.companyName =
          value.length < 1
            ? "The company name is required."
            : "";
        break;
      case "start":
        errors.start =
          value.length < 1
            ? "The date is required."
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  selectEvent = (eventInfo: any) => {
    const e = this.props.data;
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
    for (let i = 0; i < this.props.data.length; i++) {
      if (moment(this.props.data[i].start).format("YYYY-MM-DD") === moment(slotInfo.start).format("YYYY-MM-DD")) {
        this.setState({ isEvent: true });
        this.selectEvent(this.props.data[i]);
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

  addEvent = (event: any, type: string) => {
    event.preventDefault();
    if (!this.validForm()) {
      return false;
    }
    // tslint:disable-next-line:one-variable-per-declaration
    const e = this.props.data,
      year = parseInt(moment(this.state.start).format("YYYY"), 10),
      month = parseInt(moment(this.state.start).format("MM"), 10) - 1,
      day = parseInt(moment(this.state.start).format("DD"), 10),
      hour = parseInt(moment(`${this.state.start} ${this.state.time}`).format("HH"), 10),
      minute = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10),
      second = parseInt(moment(`${this.state.start} ${this.state.time}`).format("mm"), 10);
    if (type === "add") {
      const eventInfo = {
        title: this.state.title,
        allDay: false,
        start: new Date(year, month, day, hour, minute, second),
        end: new Date(year, month, day, hour, minute, second),
        companyName: this.state.companyName,
        companyCity: this.state.companyCity,
        companyStreet: this.state.companyStreet,
        comments: this.state.comments
      };
      e.push(eventInfo);
      this.props.updateEvent(e);
      this.setState({
        isEvent: true
      });
      this.selectEvent(eventInfo);
      return;
    }
    if (type === "edit") {
      const num = this.state.selectedEventNum;
      e[num].title = this.state.title;
      e[num].start = new Date(year, month, day, hour, minute, second);
      e[num].end = new Date(year, month, day, hour, minute, second);
      e[num].companyName = this.state.companyName;
      e[num].companyStreet = this.state.companyStreet;
      e[num].companyCity = this.state.companyCity;
      e[num].comments = this.state.comments;
      this.props.updateEvent(e);
      return;
    }
  }

  removeEvent = (event: any, type: string) => {
    event.preventDefault();
    const e = this.props.data;
    e.splice(this.state.selectedEventNum, 1);
    if (type === "remove") {
      this.setState({
        time: "",
        title: "",
        companyName: "",
        companyCity: "",
        companyStreet: "",
        comments: "",
        isEvent: false
      });
      this.props.updateEvent(e);
      return;
    }
    if (type === "cancel") {
      this.setState({
        isEvent: false
      });
      this.props.updateEvent(e);
      return;
    }
  }

  validForm = () => {
    // tslint:disable-next-line:one-variable-per-declaration
    const errors = this.state.errors;
    let isError = false;
    if (this.state.start === "") {
      errors.start = "The date is required.";
      isError = true;
    }
    if (this.state.title === "") {
      errors.title = "The title is required.";
      isError = true;
    }
    if (this.state.companyName === "") {
      errors.companyName = "The company name is required.";
      isError = true;
    }
    if (isError) {
      this.setState({ errors });
      return false;
    }
    this.setState({
      errors: {
        title: "",
        start: "",
        companyName: ""
      }
    });
    return true;
  }

  public render() {
    const { data } = this.props;
    const { errors } = this.state;

    return (
      <Page>
        <Container>
          <div className="container">
            <div className="row mt-5">
              <div className="col-xs-6 col-md-6 col-sm-12">
                <Form>
                  <FormLabel>
                    Date:
                    <input
                      type="date"
                      name="start"
                      className={`form-control ${errors.start ? "is-invalid" : ""}`}
                      value={this.state.start}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  {errors.start.length > 0 && <span className="error">{errors.start}</span>}
                  <FormLabel>
                    Time:
                    <input
                      type="time"
                      name="time"
                      className="form-control"
                      value={this.state.time}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  <FormLabel>
                    Job Title:
                    <input
                      type="text"
                      name="title"
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  {errors.title.length > 0 && <span className="error">{errors.title}</span>}
                  <FormLabel>
                    Company Name:
                    <input
                      type="text"
                      name="companyName"
                      className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                      value={this.state.companyName}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  {errors.companyName.length > 0 && <span className="error">{errors.companyName}</span>}
                  <FormLabel>
                    Company Street:
                    <input
                      type="text"
                      name="companyStreet"
                      className="form-control"
                      value={this.state.companyStreet}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  <FormLabel>
                    Company City:
                    <input
                      type="text"
                      name="companyCity"
                      className="form-control"
                      value={this.state.companyCity}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  <FormLabel>
                    Comments:
                    <textarea
                      name="comments"
                      className="form-control"
                      rows={5}
                      value={this.state.comments}
                      onChange={this.handleChange}
                    />
                  </FormLabel>
                  {this.state.isEvent ?
                    (<div className="text-right">
                      <button className="btn btn-primary mx-1" onClick={e => this.addEvent(e, "edit")}>Edit</button>
                      <button className="btn btn-danger mx-1" onClick={e => this.removeEvent(e, "remove")}>Remove</button>
                      <button className="btn btn-warning mx-1" onClick={e => this.removeEvent(e, "cancel")}>Cancel</button>
                    </div>)
                    :
                    (<div className="text-right">
                      <button className="btn btn-success mx-1" onClick={e => this.addEvent(e, "add")}>Add</button>
                    </div>)}
                </Form>
              </div>
              <div className="col-xs-6 col-md-6 col-sm-12">
                <Calendar
                  events={data}
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

const mapStateToProps = ({ calendar }: IApplicationState) => ({
  loading: calendar.loading,
  errors: calendar.errors,
  data: calendar.data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest()),
  updateEvent: (events:any) => dispatch(updateEvent(events))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);

const localizer = momentLocalizer(moment);

const Form = styled("form")`
  .error {
    color: #dc3545
  }

  .is-invalid {
    border-color: #dc3545;
  }

  button {
    width: 100px;
  }
`;

const FormLabel = styled("label")`
  width: 100%;
`;
