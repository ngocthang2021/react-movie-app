import axiosClient from './axiosClient';

export const category = {
	movie: 'movie',
	tv: 'tv',
};

export const movieType = {
	upcoming: 'upcoming',
	popular: 'popular',
	top_rated: 'top_rated',
};

export const tvType = {
	popular: 'popular',
	top_rated: 'top_rated',
	on_the_air: 'on_the_air',
};

const tmdbApi = {
	getMoviesList: (type, params) => {
		const url = `movie/${movieType[type]}`;
		return axiosClient.get(url, params);
	},
	getTvList: (type, params) => {
		// const url = 'tv/' + tvType[type];
		const url = `tv/${tvType[type]}`;
		return axiosClient.get(url, params);
	},
	getVideos: (media, id) => {
		const url = category[media] + '/' + id + '/videos';
		return axiosClient.get(url, { params: {} });
	},
	search: (media, params) => {
		const url = 'search/' + category[media];
		return axiosClient.get(url, params);
	},
	getDetail: (media, id, params) => {
		const url = category[media] + '/' + id;
		return axiosClient.get(url, params);
	},
	getCredits: (media, id) => {
		const url = category[media] + '/' + id + '/credits';
		return axiosClient.get(url, { params: {} });
	},
	getSimilar: (media, id) => {
		const url = category[media] + '/' + id + '/similar';
		return axiosClient.get(url, { params: {} });
	},
};

export default tmdbApi;
