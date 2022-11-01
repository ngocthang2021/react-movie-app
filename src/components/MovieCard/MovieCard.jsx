import React from 'react';
import { NavLink } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';

import Button from '../Button/Button';

import { BiPlay } from 'react-icons/bi';

import './MovieCard.scss';

function MovieCard({ movie, media }) {
	const backgroundImage = apiConfig.w500Image(movie.poster_path);

	const movieLink = `/${category[media]}/${movie.id}`;

	return (
		<NavLink to={movieLink}>
			<div
				className='movie-card'
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<Button>
					<BiPlay size={24} />
				</Button>
			</div>
			<h4>{movie.title || movie.original_title || movie.name}</h4>
		</NavLink>
	);
}

export default MovieCard;
