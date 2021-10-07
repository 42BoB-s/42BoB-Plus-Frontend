import React, { useState } from 'react';
import Modal from 'components/Modal';
import propTypes from 'prop-types';

const useModal = props => {
  const { defaultOpenState } = props;
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const close = () => {
    setIsOpen(false);
  };

  const show = () => {
    setIsOpen(true);
  };

  const componentWithModal = component => {
    return (
      <Modal isOpen={isOpen} close={close}>
        {component}
      </Modal>
    );
  };

  return [close, show, componentWithModal];
};

useModal.prototype = {
  defaultOpenState: propTypes.bool.isRequired,
};

export default useModal;
