import { useEffect, useState } from 'react';

import { Carousel } from 'antd';
import { handlerMessage } from 'common/functions';

import bannerServices from 'services/banner-services';
import { BannerModel } from 'models/banner.models';

import * as SC from './style';

const contentStyle = {
  height: '660px',
  color: '#fff',
  lineHeight: '160px',
  backgroundPosition: 'center',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
};

const HomeBanner = () => {
  const [loading, setLoading] = useState<boolean>();
  const [banner, setBanner] = useState<BannerModel[]>();

  useEffect(() => {
    const onfetchBanner = async () => {
      setLoading(true);
      try {
        const resp = await bannerServices.getBanner();
        console.log('resp', resp);
        if (!resp.error) {
          setBanner(resp.content);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        handlerMessage('Not found your withdraw amount', 'error');
      }
    };
    onfetchBanner();
  }, []);

  return (
    <SC.Wrapper>
      <Carousel autoplay>
        {banner?.map((item, index) => {
          return (
            <div key={index}>
              <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                <img src={item.hinhAnh} className='opacity-0' alt={item.hinhAnh} />
              </div>
            </div>
          );
        })}
      </Carousel>
    </SC.Wrapper>
  );
};

export default HomeBanner;
