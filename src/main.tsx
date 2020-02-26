import * as React from "react";
import { Provider, connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Store } from "redux";
import { History } from "history";
import { ThemeProvider } from "emotion-theming";

import Routes from "./routes";
import { IApplicationState } from "./store";
import { ThemeColors } from "./store/layout";
import * as themes from "./styles/theme";

// Separate props from state and props from dispatch to their own interfaces.
interface IPropsFromState {
  theme: ThemeColors;
}

interface IPropsFromDispatch {
  [key: string]: any;
}

// Any additional component props go here.
interface IOwnProps {
  store: Store<IApplicationState>;
  history: History;
}

// Create an intersection type of the component props and our Redux props.
type AllProps = IPropsFromState & IPropsFromDispatch & IOwnProps;

class Main extends React.Component<AllProps> {
  public render() {
    const { store, history, theme } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={themes[theme]}>
            <Routes />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ layout }: IApplicationState) => ({
  theme: layout.theme
});

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default connect<IPropsFromState, IPropsFromDispatch, IOwnProps, IApplicationState>(
  mapStateToProps
)(Main);
