import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from './Button';
import { ModalProvider } from './ModalContainer';
import './style.css';

class App extends Component {
  render() {
    return (
      <ModalProvider>
        <Button />
      </ModalProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
