import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFilm } from '../../redux/slice/filmsSlice';

export default function FilmList() {
  const { films } = useSelector((state) => state.films);
  const dispatch = useDispatch();

  return (
    <ul className="list_films">
      {films.Search !== undefined ? films.Search.map((film) => (
        <li key={film.imdbID}>
          <Link to={`/film/${film.imdbID}`} onClick={() => dispatch(fetchFilm(film.imdbID))} key={film.imdbID}>
            {film.Title}
          </Link>
        </li>
      ))
        : (<h4>Фильм не найден</h4>)}

    </ul>

  );
}
