import React, { Component } from 'react';

export const ModalContext = React.createContext();

const state = {
  isOpen: false,
};

const actions = new Map([
  ['openModal', { isOpen: true }],
  ['closeModal', { isOpen: false }],
]);

export const ModalComponent = ({ isOpen, closeModal }) => (
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

const createContextProvider = (state) => (actionTuples) => (ExtraComponent) => {
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
          {this.props.children}
          {ExtraComponent ? <ExtraComponent {...this.buildContextStateAndActions()} /> : null}
        </ModalContext.Provider>
      );
    }
  }
}

export const ModalProvider = createContextProvider(state)(actions)(ModalComponent);
