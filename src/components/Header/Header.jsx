import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { SiThemoviedatabase } from 'react-icons/si';
import './Header.scss';
import { useEffect } from 'react';
import { useRef } from 'react';

const navMenu = [
	{ path: '/', display: 'Home' },
	{ path: '/movie', display: 'Movies' },
	{ path: '/tv', display: 'TV Series' },
];

function Header() {
	const headerRef = useRef(null);

	// Return pathname prop from object useLocation() (-> return an object)
	const { pathname } = useLocation();

	// Return index of current active navItem
	const active = navMenu.findIndex((el) => el.path === pathname);

	// Shrink Header onScroll
	useEffect(() => {
		const shrinkHeader = () => {
			const headerHeight = headerRef.current.getBoundingClientRect().height;

			if (window.scollY > headerHeight) {
				headerRef.current.classList.add('shrink');
			} else {
				headerRef.current.classList.remove('shrink');
			}
		};
		window.addEventListener('scroll', shrinkHeader);

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', shrinkHeader);
		};
	}, []);

	return (
		<header
			className='header'
			ref={headerRef}
		>
			<nav className='nav container'>
				<NavLink
					to='/'
					className='nav__logo'
				>
					<SiThemoviedatabase size={30} />
					<span>Movies</span>
				</NavLink>
				<ul className='nav__menu'>
					{navMenu.map((el, index) => (
						<li
							key={index}
							className={`nav__item ${index === active ? 'active' : ''}`}
						>
							<NavLink
								to={el.path}
								className='nav__link'
							>
								{el.display}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
