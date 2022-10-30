import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import Category from './pages/Category/Category';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';

import './App.scss';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/:category/:id'
					element={<Detail />}
				/>
				<Route
					path='/:category'
					element={<Category />}
				/>
				<Route
					path='/:category/search/:keyword'
					element={<Category />}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
