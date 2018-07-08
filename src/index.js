import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from './Button';
import { withModalProvider } from './ModalContainer';
import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

const ConnectedApp = withModalProvider(App);

render(<ConnectedApp />, document.getElementById('root'));
