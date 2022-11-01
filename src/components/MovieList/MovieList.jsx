import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import tmdbApi from '../../api/tmdbApi';
import { category } from '../../api/tmdbApi';

import MovieCard from '../MovieCard/MovieCard';

import './MovieList.scss';

function MovieList({ media, type, id }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			let response;
			const params = {};
			if (type !== 'similar') {
				switch (media) {
					case category.movie:
						response = await tmdbApi.getMoviesList(type, { params });
						break;
					default:
						response = await tmdbApi.getTvList(type, { params });
				}
			} else response = await tmdbApi.getSimilar(category, id);
			console.log(response.results);
			setMovies(response.results);
		};
		getMovies();
	}, [media, type, id]);

	return (
		<div className='movie-list'>
			<Swiper
				grabCursor={true}
				spaceBetween={30}
				slidesPerView={'auto'}
			>
				{movies.map((movie) => (
					<SwiperSlide key={movie.id}>
						<MovieCard
							movie={movie}
							media={media}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

MovieList.propTypes = {
	media: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default MovieList;
