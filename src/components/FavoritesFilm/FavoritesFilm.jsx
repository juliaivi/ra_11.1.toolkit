import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorites } from '../../redux/slice/filmsSlice';

export default function FavoritesFilm() {
  const { favorites } = useSelector((state) => state.films);// достает информацию с хранилища

  const dispatch = useDispatch(); // выполняет определенные действия

  return (
    <ul className="favorites">
      {favorites.length !== 0 ? favorites.map((favorite) => (
        <li className="card_film favorite" key={favorite.imdbID} id={favorite.imdbID}>
          <img className="img__icon" alt="img" src={favorite.Poster} />

          <div>
            <h4>{favorite.Title}</h4>
            <ul className="film">
              <li>
                Year:
                {favorite.Year}
              </li>
              <li>
                Genre:
                {favorite.Genre}
              </li>
              <li>
                Runtime:
                {favorite.Runtime}
              </li>
              <li>
                Director:
                {favorite.Director}
              </li>
              <li>
                Actors:
                {favorite.Actors}
              </li>
              <li>
                Rating:
                {favorite.imdbRating}
              </li>
            </ul>
            <button className="remove__film" type="button" onClick={() => dispatch(removeFavorites(favorite.imdbID))}>Remove from favorites</button>
          </div>
        </li>
      )) : (<h4>Нет выбраных фильмов</h4>)}
    </ul>
  );
}
