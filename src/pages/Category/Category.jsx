import React from 'react';
import { useParams } from 'react-router';

import { category } from '../../api/tmdbApi';

import PageHeader from '../../components/PageHeader/PageHeader';
import MovieGrid from '../../components/MovieGrid/MovieGrid';

function Category() {
	// return an Object (category: movie || tv) | param from url (params depends on Route defined in App.js)
	const { category: categoryParam } = useParams();

	return (
		<>
			<PageHeader>{categoryParam === category.movie ? 'Movies' : 'TVs'}</PageHeader>
			<div className='container'>
				<div className='section mb-4'>
					<MovieGrid category={categoryParam} />
				</div>
			</div>
		</>
	);
}

export default Category;
