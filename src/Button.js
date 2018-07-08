import React from 'react';

import { ModalContext } from './ModalContainer';

const Button = () => (
  <ModalContext.Consumer>
    {({ openModal }) => (
      <button
        onClick={openModal}
      >
        Open Modal
    </button>
    )}
  </ModalContext.Consumer>
);

export default Button;
