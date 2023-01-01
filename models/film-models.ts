export type FilmModel = {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
};

export type FilmReducer = {
  film?: FilmModel[];
  dangChieu?: FilmModel[];
  sapChieu?: FilmModel[];
};

export type FilmDetail = {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
};

export type FilmDetailModel = {
  filmId: number;
  filmDetail?: FilmDetail;
  setFilmDetail: React.Dispatch<React.SetStateAction<FilmDetail | undefined>>;
};
