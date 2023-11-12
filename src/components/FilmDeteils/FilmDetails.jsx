import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorites, removeFavorites } from '../../redux/slice/filmsSlice'; // экспортируем точечно события которые нам нужны с нашего среза

export default function FilmDetails() {
  const { film } = useSelector((state) => state.films);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const hendleChange = () => {
    if (checked === false) {
      setChecked(true);
      dispatch(addFavorites(film));
    } else {
      setChecked(false);
      dispatch(removeFavorites(film.imdbID));
    }
  };

  return (
    <div className="card_film" key={film.imdbID}>
      <img className="img__icon" alt="img" src={film.Poster} />
      <div>
        <h4>{film.Title}</h4>
        <ul className="film">
          <li>
            Year:
            {film.Year}
          </li>
          <li>
            Genre:
            {film.Genre}
          </li>
          <li>
            Runtime:
            {film.Runtime}
          </li>
          <li>
            Director:
            {film.Director}
          </li>
          <li>
            Actors:
            {film.Actors}
          </li>
          <li>
            Rating:
            {film.imdbRating}
          </li>
        </ul>
        <label htmlFor="check">
          <input id="check" type="checkbox" checked={checked} onChange={hendleChange} />
          <span>Favorites</span>
        </label>
      </div>
      <NavLink to="/films"><button type="button">x</button></NavLink>
    </div>
  );
}
