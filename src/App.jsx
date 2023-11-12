import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FavoritesFilm from './components/FavoritesFilm/FavoritesFilm';
import SearchFilm from './components/Search/Search';
import FilmDetails from './components/FilmDeteils/FilmDetails';
import FilmList from './components/FilmList/FilmList';
import { main } from './redux/slice/filmsSlice';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchFilm />} />
        <Route path="/films" element={<FilmList />} />
        <Route path="/film/:id" element={<FilmDetails />} />
        <Route path="/favorites" element={<FavoritesFilm />} />
      </Routes>
    </Router>
  );
}

function Header() {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <Link to="/"><button type="button" onClick={() => dispatch(main())}>Главная</button></Link>
      <Link to="/favorites"><button type="button">Избранное</button></Link>
    </div>
  );
}

export default App;
