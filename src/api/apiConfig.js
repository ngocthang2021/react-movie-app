const apiConfig = {
	baseUrl: process.env.REACT_APP_TMDB_BASE_URL,
	apiKey: process.env.REACT_APP_TMDB_API_KEY,
	originalImage: (imgPath) => `${process.env.REACT_APP_TMDB_IMAGE_URL}original/${imgPath}`,
	w500Image: (imgPath) => `${process.env.REACT_APP_TMDB_IMAGE_URL}w500/${imgPath}`,
};

export default apiConfig;
