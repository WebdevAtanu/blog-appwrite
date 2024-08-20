import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Posting from './Posting';

function Routing() {
	return (
		<BrowserRouter>
		<Header/>
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/post' element={<Posting/>}/>
		</Routes>
		</BrowserRouter>
	)
}

export default Routing