import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmModel, FilmReducer } from 'models/film-models';
import { AppState } from 'store/type';

const initialState: FilmReducer = {};

export const slice = createSlice({
  name: 'filmRedux',
  initialState,
  reducers: {
    UpdateFilm: (state, action: PayloadAction<FilmModel[]>) => {
      state.dangChieu = action.payload.filter((item) => item.dangChieu === true);
      state.sapChieu = action.payload.filter((item) => item.sapChieu === true);
      state.film = action.payload;
    },
  },
});

export const selectFilmNow = (state: AppState) => state.film.dangChieu;
export const selectFilmComing = (state: AppState) => state.film.sapChieu;

// Action creators are generated for each case reducer function
export const { UpdateFilm } = slice.actions;

export default slice.reducer;
