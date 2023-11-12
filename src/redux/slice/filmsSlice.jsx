import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  loading: false,
  error: '',
  favorites: [],
  film: [],
  status: null,
};

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms', // имя - принимает название нашего экшена(name: 'films') и добавляем имя нашего экшена fetchFilms
  async (url, { rejectWithValue }) => { // первый параметр, то что передаем через деспетчер нашего метода, а второй параметр - это то что может понадобится внутри этой функции. ( отклонить со значением- rejectWithValue)
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=64405bd2&s=${url}&plot=full`);

      if (!response.ok) {
        return rejectWithValue('Loading error!');// rejectWithValue(value, [meta]):  ignoreWithValue — это служебная функция, с помощью которой вы можете return(или throw) в своем создателе действий возвращать отклоненный ответ с определенной полезной нагрузкой и метаданными. Он передаст любое значение, которое вы ему дадите, и вернет его в полезных данных отклоненного действия. Если вы также передадите файл meta, он будет объединен с существующим файлом rejectedAction.meta.
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const fetchFilm = createAsyncThunk(
  'films/fetchFilm',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=64405bd2&i=${url}`);

      if (!response.ok) {
        return rejectWithValue('Loading error!');
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorites: (state, action) => {
      state.favorites = state.favorites.filter((film) => film.imdbID !== action.payload);
    },
    main: (state) => {
      state.films = [];
    },
  },
  extraReducers: (builder) => {
    //    [fetchFilms.pending] : [state, action] => {}
    // Это означает, что сам создатель действия может использоваться в качестве ссылки на «тип действия» в некоторых местах , например, в предоставленных ключах builder.addCaseили createReducerобозначении объекта
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.films = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.film = action.payload;
        state.loading = false;
        state.error = '';
      });
  },

});

export const { addFavorites, removeFavorites, main } = filmsSlice.actions; // обязательно нужно достать методы и редьюсер
export default filmsSlice.reducer; // reducers - формируется некий редьюсер из этого и подключить в стор, срезов может быть сколько угодно
