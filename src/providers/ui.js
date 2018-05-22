import React, { Component, createContext } from 'react';

const UICtx = createContext();

export class UIProvider extends Component {
  state = {
    currentTaskListId: '__new',
    userSearchValue: ''
  };

  changeUserSearchValue = userSearchValue => this.setState({ userSearchValue });
  changeTaskListId = currentTaskListId => this.setState({ currentTaskListId });

  render() {
    return (
      <UICtx.Provider
        value={{
          state: this.state,
          actions: {
            changeTaskListId: this.changeTaskListId,
            changeUserSearchValue: this.changeUserSearchValue
          }
        }}
      >
        {this.props.children}
      </UICtx.Provider>
    );
  }
}

export const withUIConsumer = WrappedComponent => props => (
  <UICtx.Consumer>
    {ctx => <WrappedComponent ctx={ctx} {...props} />}
  </UICtx.Consumer>
);
