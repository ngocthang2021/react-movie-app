import React from 'react';
import { NavLink } from 'react-router-dom';

import { movieType, category, tvType } from '../../api/tmdbApi';

import HeroSlide from '../../components/HeroSlide/HeroSlide';
import { OutlineButton } from '../../components/Button/Button';

import MovieList from '../../components/MovieList/MovieList';

function Home() {
	return (
		<>
			<HeroSlide />
			<div className='container'>
				<div className='section mb-3'>
					<div className='section__header mb-2'>
						<h2>Trending Movies</h2>
						<NavLink to='/movie'>
							<OutlineButton className='small'>View more</OutlineButton>
						</NavLink>
					</div>
					<MovieList
						media={category.movie}
						type={movieType.popular}
					/>
				</div>

				<div className='section mb-3'>
					<div className='section__header mb-2'>
						<h2>Top Rated Movies</h2>
						<NavLink to='/movie'>
							<OutlineButton className='small'>View more</OutlineButton>
						</NavLink>
					</div>
					<MovieList
						media={category.movie}
						type={movieType.top_rated}
					/>
				</div>

				<div className='section mb-3'>
					<div className='section__header mb-2'>
						<h2>Trending TV</h2>
						<NavLink to='/tv'>
							<OutlineButton className='small'>View more</OutlineButton>
						</NavLink>
					</div>
					<MovieList
						media={category.tv}
						type={tvType.popular}
					/>
				</div>

				<div className='section mb-3'>
					<div className='section__header mb-2'>
						<h2>Top Rated TV</h2>
						<NavLink to='/tv'>
							<OutlineButton className='small'>View more</OutlineButton>
						</NavLink>
					</div>
					<MovieList
						media={category.tv}
						type={tvType.top_rated}
					/>
				</div>
			</div>
		</>
	);
}

export default Home;
