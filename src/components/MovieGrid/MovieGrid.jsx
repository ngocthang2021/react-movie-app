import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

import MovieCard from '../MovieCard/MovieCard';
import Button, { OutlineButton } from '../Button/Button';
import Input from '../Input/Input';

import './MovieGrid.scss';

function MovieGrid({ category: movieCategory }) {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	const { keyword } = useParams();

	useEffect(() => {
		const getList = async () => {
			let response = null;
			let params;

			if (keyword === undefined) {
				params = {};

				switch (movieCategory) {
					case category.movie:
						response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
						break;
					default:
						response = await tmdbApi.getTvList(tvType.popular, { params });
				}
			} else {
				params = { query: keyword };
				response = await tmdbApi.search(category, { params });
			}

			setMovies(response.results);
			setTotalPage(response.total_pages);
		};

		getList();
	}, [movieCategory, keyword]);

	// Load more function
	const loadMore = async () => {
		let response = null;
		let params;

		if (keyword === undefined) {
			params = { page: page + 1 };

			switch (movieCategory) {
				case category.movie:
					response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
					break;
				default:
					response = await tmdbApi.getTvList(tvType.popular, { params });
			}
		} else {
			params = { query: keyword };
			response = await tmdbApi.search(category, { params });
		}

		setMovies([...movies, ...response.results]);
		setPage(page + 1);
	};

	return (
		<>
			<div className='section mb-4'>
				<MovieSearch
					seacrchCategory={movieCategory}
					keyword={keyword}
				/>
			</div>
			<div className='movie-grid'>
				{movies.map((movie) => (
					<MovieCard
						key={movie.id}
						category={movieCategory}
						movie={movie}
					/>
				))}
			</div>
			{page < totalPage ? (
				<div className='movie-grid__load'>
					<OutlineButton
						className='small'
						onClick={loadMore}
					>
						Load more
					</OutlineButton>
				</div>
			) : null}
		</>
	);
}

function MovieSearch({ seacrchCategory, keyword }) {
	const navigate = useNavigate();

	const [searchKeyword, setSearchKeyword] = useState(keyword ? keyword : '');

	const navigateSearchPage = useCallback(() => {
		if (searchKeyword.trim().length > 0) {
			navigate(`/${category[seacrchCategory]}/search/${searchKeyword}`);
		}
	}, [searchKeyword, seacrchCategory, navigate]);

	useEffect(() => {
		const enterEvent = (e) => {
			e.preventDefault();

			if (e.keycode === 13) {
				navigateSearchPage();
			}
		};

		document.addEventListener('keyup', enterEvent);

		return () => {
			document.removeEventListener('keyup', enterEvent);
		};
	}, [keyword, navigateSearchPage]);

	return (
		<div className='movie-search'>
			<Input
				type='text'
				placeholder='Enter Keyword'
				value={keyword}
				onChange={(e) => setSearchKeyword(e.target.value)}
			/>
			<Button
				className='small'
				onClick={navigateSearchPage}
			>
				Search
			</Button>
		</div>
	);
}

export default MovieGrid;
