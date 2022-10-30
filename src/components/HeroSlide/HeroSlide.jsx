import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import tmdbApi, { movieType, category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../Button/Button';
import Modal from '../Modal/Modal';

import './HeroSlide.scss';

function HeroSlide() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const params = { language: 'en-US', page: 1 };
			try {
				const response = await tmdbApi.getMoviesList(movieType.popular, { params });

				setMovies(response.results.slice(0, 4));
				console.log(response);

				return response;
			} catch {
				console.log('error');
			}
		};

		getMovies();
	}, []);

	console.log(movies);

	return (
		// Hero Slide Wrapper
		<div className='hero-slide-wrapper'>
			<Swiper
				slidesPerView={1}
				spaceBetween={0}
				pagination={{
					clickable: true,
				}}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={(Autoplay, Pagination)}
				className='mySwiper'
			>
				{movies.map((movie) => (
					<SwiperSlide key={movie.id}>
						{/* return current active slide */}
						{({ isActive }) => (
							<HeroSlideItem
								movie={movie}
								className={`${isActive ? 'active' : ''}`}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

// Hero Slide Item
function HeroSlideItem({ movie, className }) {
	const navigate = useNavigate();

	// Get backgroundImage url
	const backgroundImage = apiConfig.originalImage(movie.backdrop_path ? movie.backdrop_path : movie.poster_path);
	const posterImage = apiConfig.w500Image(movie.poster_path);

	return (
		<div
			className={`hero-slide-item ${className}`}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			{/* Slide Content */}
			<div className='hero-slide-item__content container'>
				{/* Content Poster */}
				<div className='hero-slide-item__content-poster'>
					<img
						src={posterImage}
						alt={movie.title || movie.original_title || movie.name}
					/>
				</div>
				{/* Content Info */}
				<div className='hero-slide-item__content-info'>
					<h4 className='title'>{movie.title || movie.original_title || movie.name}</h4>
					<p className='overview'>{movie.overview}</p>
					<div className='buttons'>
						<Button onClick={() => navigate(`/movie/${movie.id}`)}>Watch Now</Button>
						<OutlineButton>Watch Trailer</OutlineButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroSlide;
