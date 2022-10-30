import React, { useState, useEffect, useRef } from 'react';
import PropsType from 'prop-types';

import { MdClose } from 'react-icons/md';

import './Modal.scss';

function Modal({ children, id, active }) {
	return <div>Modal</div>;
}

Modal.propsType = {
	active: PropsType.bool,
	id: PropsType.string,
};

export function ModalContent({ children, id, active, onClose }) {
	return <div>ModalContent</div>;
}

export default Modal;
