import React from 'react';
import './Modal.scss';
import propTypes from 'prop-types';

const Modal = props => {
  const { isOpen, close, children } = props;

  return (
    <>
      {isOpen ? (
        <div
          role="presentation"
          className="modal-dimmer"
          onKeyUp={close}
          onClick={close}
        >
          <div
            role="presentation"
            className="modal-container"
            onKeyUp={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

Modal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default Modal;
