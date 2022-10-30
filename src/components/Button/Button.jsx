import React from 'react';
import PropsType from 'prop-types';

import './Button.scss';

function Button({ children, className, onClick }) {
	return (
		<button
			className={`btn ${className}`}
			onClick={onClick ? () => onClick() : null}
		>
			{children}
		</button>
	);
}

export function OutlineButton({ children, className, onClick }) {
	return (
		<button
			className={`btn btn--outline ${className}`}
			onClick={onClick ? () => onClick() : null}
		>
			{children}
		</button>
	);
}

Button.propsTyp = {
	onclick: PropsType.func,
};

export default Button;
