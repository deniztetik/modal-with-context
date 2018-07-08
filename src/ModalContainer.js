import React, { Component } from 'react';

const ModalContext = React.createContext();

const state = {
  isOpen: false,
};

const actions = new Map([
  ['openModal', { isOpen: true }],
  ['closeModal', { isOpen: false }],
]);

export const ExtraComponent = ({ isOpen, closeModal }) => (
  isOpen ?
    <div id='app-modal'>
      <div id='app-modal__content'>
        <h1>This is a modal</h1>
        <button
          onClick={closeModal}
        >
          Close Modal
      </button>
      </div>
    </div> : null
);
 
const createModalProvider = (actionTuples) => (state) => (ExtraComponent) => (WrappedComponent) => {
  return class extends Component {
    state = state;

    actions = [...actionTuples].reduce((actions, actionTuple) => {
      const updatedActions = { ...actions };
      const key = actionTuple[0];
      const value = actionTuple[1];

      updatedActions[key] = () => {
        this.setState({ ...value });
      };

      return updatedActions;
    }, {});

    buildContextStateAndActions() {
      return {
        ...this.state,
        ...this.actions,
      };
    }

    render() {
      return (
        <ModalContext.Provider value={this.buildContextStateAndActions()}>
          <WrappedComponent {...this.props} />
          {ExtraComponent ? <ExtraComponent {...this.buildContextStateAndActions()} /> : null}
        </ModalContext.Provider>
      );
    }
  }
}

export const withModalProvider = createModalProvider(actions)(state)(ExtraComponent);

export const withModalConsumer = (WrappedComponent) =>
  (props) => {
    return (
      <ModalContext.Consumer>
        {contextProps => (
          <WrappedComponent {...contextProps} {...props} />
        )}
      </ModalContext.Consumer>
    );
  }
