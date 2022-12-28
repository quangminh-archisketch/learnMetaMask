import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as L from './style';
import { FilmModel } from 'models/film-models';
import filmServices from 'services/film-services';
import { handlerMessage } from 'common/functions';
import { Button } from 'antd';

const ListFilm = () => {
  const [loading, setLoading] = useState<boolean>();
  const [film, setFilm] = useState<FilmModel[]>();
  const [comming, setComming] = useState<boolean>();

  useEffect(() => {
    const onfetchListFilm = async () => {
      setLoading(true);
      try {
        const resp = await filmServices.getFilm();
        console.log('resp', resp);
        if (!resp.error) {
          setFilm(resp.content);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        handlerMessage('Not found your withdraw amount', 'error');
      }
    };
    onfetchListFilm();
  }, []);

  return (
    <L.ListFilm>
      <div className='btn-film'>
        <Button className='mr-3' type='primary'>
          Đang Chiếu
        </Button>
        <Button type='primary' danger>
          Sắp Chiếu
        </Button>
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        {film?.map((item, key) => {
          return (
            <SwiperSlide key='index'>
              <div className='centerflipcards'>
                <div className='square-flip'>
                  <div className='square'>
                    <div className='square-container'>
                      <div className='align-center'>
                        <img src={item?.hinhAnh} className='boxshadow' alt={item?.biDanh} />
                      </div>
                      <h2 className='textshadow'>Kallyas Wp Theme</h2>
                      <h3 className='textshadow'>{item?.tenPhim}.</h3>
                    </div>
                    <div className='flip-overlay' />
                  </div>
                  <div
                    className='square2'
                    data-image='https://images.unsplash.com/photo-1477313372947-d68a7d410e9f?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb'>
                    <div className='square-container2'>
                      <div className='align-center' />
                      <h2>{item?.tenPhim}</h2>
                    </div>
                    <div className='flip-overlay' />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </L.ListFilm>
  );
};

export default ListFilm;
