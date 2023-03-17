import React from "react";
import { StateContext } from "./StateProvider";

const withStateValue = (Component) => {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <StateContext.Consumer>
          {([state, dispatch]) => (
            <Component {...this.props} state={state} dispatch={dispatch} />
          )}
        </StateContext.Consumer>
      );
    }
  }

  return WrappedComponent;
};

export default withStateValue;
