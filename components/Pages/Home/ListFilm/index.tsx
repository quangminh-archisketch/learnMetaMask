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

const ListFilm = () => {
  const [loading, setLoading] = useState<boolean>();
  const [film, setFilm] = useState<FilmModel[]>();

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
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        <SwiperSlide>
          <div className='centerflipcards'>
            <div className='square-flip'>
              <div
                className='square'
                data-image='https://images.unsplash.com/photo-1477313372947-d68a7d410e9f?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb'>
                <div className='square-container'>
                  <div className='align-center'>
                    <img
                      src='http://titanicthemes.com/files/flipbox/kallyas2.png'
                      className='boxshadow'
                      alt
                    />
                  </div>
                  <h2 className='textshadow'>Kallyas Wp Theme</h2>
                  <h3 className='textshadow'>
                    The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.
                  </h3>
                </div>
                <div className='flip-overlay' />
              </div>
              <div
                className='square2'
                data-image='https://images.unsplash.com/photo-1477313372947-d68a7d410e9f?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb'>
                <div className='square-container2'>
                  <div className='align-center' />
                  <h2>#1 Front-end Visual Website Builder in 2016</h2>
                </div>
                <div className='flip-overlay' />
              </div>
            </div>
            <div className='square-flip'>
              <div
                className='square'
                data-image='http://titanicthemes.com/files/flipbox/kallyas-bundle.png'>
                <div className='square-container'>
                  <div className='align-center'>
                    <img
                      src='http://titanicthemes.com/files/flipbox/kallyas.png'
                      className='boxshadow'
                      alt
                    />
                  </div>
                  <h2 className='textshadow'>Kallyas WordPress Theme</h2>
                  <h3 className='textshadow'>
                    The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.
                  </h3>
                </div>
                <div className='flip-overlay' />
              </div>
              <div
                className='square2'
                data-image='http://titanicthemes.com/files/flipbox/kallyas-bundle.png'>
                <div className='square-container2'>
                  <div className='align-center' />
                  <a href='http://kallyas.net' target='_blank' className='boxshadow kallyas-button'>
                    View Demos
                  </a>
                </div>
                <div className='flip-overlay' />
              </div>
            </div>
            <div className='square-flip'>
              <div
                className='square'
                data-image='https://instagram.fotp3-2.fna.fbcdn.net/t51.2885-15/e35/14712096_386502691740262_2357154798815412224_n.jpg?ig_cache_key=MTM2NzU2MzUwNjQ3OTUzOTgxNQ%3D%3D.2'>
                <div className='square-container'>
                  <div className='align-center'>
                    <img
                      src='http://titanicthemes.com/files/flipbox/kallyas2.png'
                      className='boxshadow'
                      alt
                    />
                  </div>
                  <h2 className='textshadow'>Kallyas WordPress Theme</h2>
                  <h3 className='textshadow'>
                    The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.
                  </h3>
                </div>
                <div className='flip-overlay' />
              </div>
              <div
                className='square2'
                data-image='http://titanicthemes.com/files/flipbox/kallyas-wedding.jpg'>
                <div className='square-container2'>
                  <div className='align-center' />
                  <h2>The only theme you'll ever need. No codding skills needed.</h2>
                </div>
                <div className='flip-overlay' />
              </div>
            </div>
            <div className='clearfix' />
            <p>Made with ♡ by Nicola Mihaita</p>
            <a href='http://hogash.com' target='_blank'>
              @Hogash.com
            </a>
            <br />
            <br />
            <br />
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </L.ListFilm>
  );
};

export default ListFilm;
