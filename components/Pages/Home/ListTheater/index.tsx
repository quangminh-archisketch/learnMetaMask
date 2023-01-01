import { Tabs } from 'antd';
import { TheaterModels } from 'models/theater-models';
import { useEffect, useState } from 'react';
import theaterServices from 'services/theater-services';
import { Container } from 'styles/__styles';
import ListFilm from './ListFilmTheater';
import * as L from './style';

const ListTheater = () => {
  const [loading, setLoading] = useState<boolean>();
  const [theater, setTheater] = useState<TheaterModels>();

  useEffect(() => {
    const onfetchListTheater = async () => {
      setLoading(true);
      try {
        const resp = await theaterServices.getTheater();
        if (!resp.error) {
          setTheater(resp.content);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    onfetchListTheater();
  }, []);

  return (
    <L.ListTheater>
      <Tabs tabPosition='left'>
        {theater?.map((theater) => {
          return (
            <Tabs.TabPane
              tab={
                <span>
                  <img className='logo' src={theater.logo} alt={theater.maHeThongRap} />
                  {theater.tenHeThongRap}
                </span>
              }
              key={theater.maHeThongRap}>
              <Tabs tabPosition='left'>
                {theater.lstCumRap?.map((cumRap) => {
                  return (
                    <>
                      <Tabs.TabPane
                        tab={
                          <>
                            <div className='theater-cluser'>
                              <img className='logo' src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
                              <div className='info'>
                                <p>{cumRap.tenCumRap}</p>
                                <p>{cumRap.diaChi}</p>
                              </div>
                            </div>
                          </>
                        }
                        key={cumRap.maCumRap}>
                        {cumRap.danhSachPhim?.slice(0, 4).map((film) => {
                          return (
                            <>
                              <ListFilm film={film} />
                            </>
                          );
                        })}
                      </Tabs.TabPane>
                    </>
                  );
                })}
              </Tabs>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </L.ListTheater>
  );
};

export default ListTheater;
