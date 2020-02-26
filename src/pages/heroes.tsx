import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import HeroesIndexPage from "./heroes/index";
import ShowHeroesPage from "./heroes/show";

import { IApplicationState, IConnectedReduxProps } from "../store";
import { Hero } from "../store/heroes/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
  loading: boolean;
  data: Hero[];
  errors?: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & RouteComponentProps<{}> & IConnectedReduxProps;

class HeroesPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact={true} path={`${match.path}/`} component={HeroesIndexPage} />
        <Route path={`${match.path}/:name`} component={ShowHeroesPage} />
      </Switch>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: IApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(HeroesPage);
