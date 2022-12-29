import { Tabs } from 'antd';
import { TheaterModels } from 'models/theater-models';
import { useEffect, useState } from 'react';
import theaterServices from 'services/theater-services';
import * as L from './style';

const ListTheater = () => {
  const [loading, setLoading] = useState<boolean>();
  const [theater, setTheater] = useState<TheaterModels>();
  console.log(theater);

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
      <Tabs tabPosition='left' defaultActiveKey='1'>
        <Tabs.TabPane tab='All' key='all'></Tabs.TabPane>
        <Tabs.TabPane tab='Review' key='review'></Tabs.TabPane>
        <Tabs.TabPane tab='Comment' key='comment'></Tabs.TabPane>
      </Tabs>
    </L.ListTheater>
  );
};

export default ListTheater;
