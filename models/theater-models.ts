export type TheaterModels = [
  {
    lstCumRap: [ListTheaterCluser];
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    mahom: string;
  }
];

export type ListTheaterCluser = {
  danhSachPhim: [ListFilm];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
};

export type ListFilm = {
  lstLichChieuTheoPhim: [Showtimes];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
};

export type Showtimes = {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
};
