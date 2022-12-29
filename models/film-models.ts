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
