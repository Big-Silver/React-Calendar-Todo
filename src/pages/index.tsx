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

declare const allViews: View[];

interface IPropsFromState {
  loading: boolean;
  errors?: string;
  data: Calendar[];
}

interface IPropsFromDispatch {
  fetchRequest: typeof fetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps;

class IndexPage extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      selected: undefined
    };

    this.selectEvent = this.selectEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
  }

  public componentDidMount() {
    const { data } = this.props;

    if (data.length === 0) {
      this.props.fetchRequest();
    }
  }

  selectEvent = (eventInfo: any) => {
    console.log("@@@@@@@@@@@@@@@ event : ", eventInfo);
  }

  selectSlot = (slotInfo: any) => {
    console.log("@@@@@@@@@@ : ", slotInfo);
  }

  public render() {
    const { data } = this.props;
    const events = [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 3, 0),
        end: new Date(2020, 3, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 3, 7),
        end: new Date(2020, 3, 10)
      },
      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0)
      },
      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },
      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 3, 9, 0, 0, 0),
        end: new Date(2020, 3, 10, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 3, 11),
        end: new Date(2020, 3, 13),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 3, 12, 10, 30, 0, 0),
        end: new Date(2020, 3, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 3, 12, 12, 0, 0, 0),
        end: new Date(2020, 3, 12, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 3, 12, 14, 0, 0, 0),
        end: new Date(2020, 3, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 3, 12, 17, 0, 0, 0),
        end: new Date(2020, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 3, 12, 20, 0, 0, 0),
        end: new Date(2020, 3, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 3, 13, 7, 0, 0),
        end: new Date(2020, 3, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 3, 17, 19, 30, 0),
        end: new Date(2020, 3, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 3, 17, 19, 30, 0),
        end: new Date(2020, 3, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 3, 20, 19, 30, 0),
        end: new Date(2020, 3, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      },
      {
        id: 15,
        title: "Point in Time Event",
        start: new Date(),
        end: new Date()
      },
      {
        id: 16,
        title: "Video Record",
        start: new Date(2020, 3, 14, 15, 30, 0),
        end: new Date(2020, 3, 14, 19, 0, 0)
      },
      {
        id: 17,
        title: "Dutch Song Producing",
        start: new Date(2020, 3, 14, 16, 30, 0),
        end: new Date(2020, 3, 14, 20, 0, 0)
      },
      {
        id: 18,
        title: "Itaewon Halloween Meeting",
        start: new Date(2020, 3, 14, 16, 30, 0),
        end: new Date(2020, 3, 14, 17, 30, 0)
      },
      {
        id: 19,
        title: "Online Coding Test",
        start: new Date(2020, 3, 14, 17, 30, 0),
        end: new Date(2020, 3, 14, 20, 30, 0)
      },
      {
        id: 20,
        title: "An overlapped Event",
        start: new Date(2020, 3, 14, 17, 0, 0),
        end: new Date(2020, 3, 14, 18, 30, 0)
      },
      {
        id: 21,
        title: "Phone Interview",
        start: new Date(2020, 3, 14, 17, 0, 0),
        end: new Date(2020, 3, 14, 18, 30, 0)
      },
      {
        id: 22,
        title: "Cooking Class",
        start: new Date(2020, 3, 14, 17, 30, 0),
        end: new Date(2020, 3, 14, 19, 0, 0)
      },
      {
        id: 23,
        title: "Go to the gym",
        start: new Date(2020, 3, 14, 18, 30, 0),
        end: new Date(2020, 3, 14, 20, 0, 0)
      },
    ];

    return (
      <Page>
        <Container>
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-md-6 col-sm-12">
                <div><p>test</p></div>
              </div>
              <div className="col-xs-6 col-md-6 col-sm-12">
                <Calendar
                  events={events}
                  defaultView={"month"}
                  views={["day", "week", "month"]}
                  step={60}
                  showMultiDayTimes={true}
                  defaultDate={new Date(2020, 2, 1)}
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
