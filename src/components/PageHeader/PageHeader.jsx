import React from 'react';

import background from '../../assets/footer-bg.jpg';
import './PageHeader.scss';

function PageHeader({ children }) {
	return (
		<div
			className='page-header'
			style={{ backgroundImage: `url(${background})` }}
		>
			<h4>{children}</h4>
		</div>
	);
}

export default PageHeader;
