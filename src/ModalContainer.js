import React, { Component } from 'react';

const ModalContext = React.createContext();

export const withModalProvider = (WrappedComponent) => {
  return class extends Component {
    buildContextStateAndActions() {
      return {
        ...this.state,
        ...this.actions,
      };
    }

    state = {
      isOpen: false,
    }

    actions = {
      openModal: () => {
        this.setState({
          isOpen: true
        });
      },
    }

    render() {
      const {
        isOpen,
      } = this.state;

      return (
        <ModalContext.Provider value={this.buildContextStateAndActions()}>
          <WrappedComponent {...this.props} />
          {isOpen ?
            <div id='app-modal'>
              <div id='app-modal__content'>
                <h1>This is a modal</h1>
                <button
                  onClick={() => this.setState({ isOpen: false })}
                >
                  Close Modal
                </button>
              </div>
            </div> : null}
        </ModalContext.Provider>
      );
    }
  }
};

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
