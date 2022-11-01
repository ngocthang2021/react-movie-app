import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import tmdbApi, { movieType, category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../Button/Button';
import Modal, { ModalContent } from '../Modal/Modal';

import './HeroSlide.scss';

function HeroSlide() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const params = { language: 'en-US', page: 1 };
			try {
				const response = await tmdbApi.getMoviesList(movieType.popular, { params });

				setMovies(response.results.slice(0, 4));
				// console.log(response);

				return response;
			} catch {
				console.log('error');
			}
		};

		getMovies();
	}, []);

	// console.log(movies);

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
			{movies.map((movie) => (
				<TrailerModal
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	);
}

// Hero Slide Item
function HeroSlideItem({ movie, className }) {
	const navigate = useNavigate();

	// Get backgroundImage url
	const backgroundImage = apiConfig.originalImage(movie.backdrop_path ? movie.backdrop_path : movie.poster_path);
	// Get posterImage url
	const posterImage = apiConfig.w500Image(movie.poster_path);

	const setModalActive = async () => {
		const videos = await tmdbApi.getVideos(category.movie, movie.id);

		const modal = document.getElementById(`modal_${movie.id}`);
		const iframe = modal.querySelector('.modal-content > iframe');
		console.log(modal);

		if (videos.results.length > 0) {
			const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
			console.log(videoSrc);

			iframe.setAttribute('src', videoSrc);
		} else {
			modal.querySelector('.modal-content > iframe').innerHTML('No trailer');
		}

		modal.classList.toggle('active');
	};

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
						<OutlineButton onClick={setModalActive}>Watch Trailer</OutlineButton>
					</div>
				</div>
			</div>
		</div>
	);
}

function TrailerModal({ movie }) {
	const iframeRef = useRef(null);

	const onClose = () => iframeRef.current.setAttribute('src', '');

	return (
		<Modal
			active={false}
			id={`modal_${movie.id}`}
		>
			<ModalContent onClose={onClose}>
				<iframe
					title='Trailer'
					width='100%'
					height='500px'
				></iframe>
			</ModalContent>
		</Modal>
	);
}

export default HeroSlide;
