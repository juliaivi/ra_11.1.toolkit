import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchFilms } from '../../redux/slice/filmsSlice';

export default function SearchFilm() {
  const { loading, error } = useSelector((state) => state.films); // с хранилища берем денные
  const [film, setFilm] = useState(''); // состояние инпут
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendleChange = (e) => {
    setFilm(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (film === '') return;
    dispatch(fetchFilms(film));
    (navigate('./films'));
  };

  return (
    <>
      <form className="form__search" onSubmit={onSearch}>
        <input type="text" onChange={hendleChange} />
        <button type="submit">Search</button>
      </form>
      {loading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4> }
    </>
  );
}
