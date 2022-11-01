import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import './Modal.scss';

function Modal({ active, id, children }) {
	const [modalActive, setModalActive] = useState(false);

	useEffect(() => {
		setModalActive(active);
	}, [active]);

	return (
		<div
			id={id}
			className={`modal ${modalActive ? 'active' : ''}`}
		>
			{children}
		</div>
	);
}

Modal.propType = {
	active: PropTypes.bool,
	id: PropTypes.string,
};

// Modal Content
export function ModalContent({ onClose, chidlren }) {
	const modalContentRef = useRef(null);

	const closeModal = () => {
		modalContentRef.current.parentNode.classList.remove('active');
		if (onClose) onClose();
	};

	return (
		<div
			ref={modalContentRef}
			className='modal-content'
		>
			{chidlren}
			<div
				className='modal-content__close'
				onClick={closeModal}
			>
				<MdClose size={30} />
			</div>
		</div>
	);
}

ModalContent.propType = {
	onClose: PropTypes.func,
};

export default Modal;
