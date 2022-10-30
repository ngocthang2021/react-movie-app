import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

import { SiThemoviedatabase } from 'react-icons/si';
import footerBg from '../../assets/footer-bg.jpg';

function Footer() {
	return (
		<div
			className='footer'
			style={{ backgroundImage: `url(${footerBg})` }}
		>
			<div className='footer__container container'>
				<div className='footer__logo'>
					<NavLink
						to='/'
						className='footer__logo-link'
					>
						<SiThemoviedatabase size={30} />
						<span>Movies</span>
					</NavLink>
				</div>
				<div className='footer__menu'>
					<div className='footer__list'>
						<NavLink to='/'>Home</NavLink>
						<NavLink to='/'>Contact us</NavLink>
						<NavLink to='/'>Term of services</NavLink>
						<NavLink to='/'>About us</NavLink>
					</div>
					<div className='footer__list'>
						<NavLink to='/'>Live</NavLink>
						<NavLink to='/'>FAQ</NavLink>
						<NavLink to='/'>Premium</NavLink>
						<NavLink to='/'>Pravacy policy</NavLink>
					</div>
					<div className='footer__list'>
						<NavLink to='/'>You must watch</NavLink>
						<NavLink to='/'>Recent release</NavLink>
						<NavLink to='/'>Top IMDB</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
