import React from 'react';

import { withModalConsumer } from './ModalContainer';

const Button = ({ openModal }) => (
  <button
    onClick={openModal}
  >
    Open Modal
  </button>
)

export default withModalConsumer(Button);