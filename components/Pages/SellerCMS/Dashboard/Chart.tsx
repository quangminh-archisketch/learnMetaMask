import React, { useEffect, useRef, useState } from 'react';

import moment, { Moment } from 'moment';
import { DatePicker, Radio } from 'antd';
import { Line } from '@ant-design/plots';

import { handlerMessage } from 'common/functions';
import sellerServices from 'services/seller-services';

import { StatisticalModel } from 'models/seller.model';

import styled from 'styled-components';

type ChartList = {
  type: number;
  start_date: string | Date;
  end_date: string | Date;
  data: StatisticalModel[] | null;
};
type RangeValue = [Moment | null, Moment | null] | null;

const ChartComponent = () => {
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [dates, setDates] = useState<RangeValue>(null);
  const [charLists, setChartLists] = useState<ChartList>({
    type: 1,
    start_date: '',
    end_date: '',
    data: null,
  });

  useEffect(() => {
    onFetchStatical();
  }, [charLists.type, charLists.start_date, charLists.end_date]);

  const onFetchStatical = async () => {
    try {
      const { type, start_date, end_date } = charLists;

      const resp = await sellerServices.getStatistical({ type, start_date, end_date });

      if (!resp.error) {
        setChartLists((prevState) => ({
          ...prevState,
          data: resp.data.map((item: StatisticalModel) => ({ day: item.time, value: item.value })),
          isShowChart: true,
        }));
      }
    } catch (error) {
      handlerMessage('Statistical not found', 'error');
    }
  };

  const config = {
    data: charLists.data || [],
    xField: 'day',
    yField: 'value',
    height: 328,
    smooth: true,
    meta: { xField: { range: [0, 0] }, yField: { range: [0, 0] } },
  };

  const disabledDate = (current: Moment) => {
    if (!dates) return false;
    return (
      current > moment(dates[0]).add(1, 'month') || current < moment(dates[1]).add(-1, 'month')
    );
  };

  return (
    <>
      <FilterBox_wrapper ref={chartWrapperRef}>
        <Radio.Group
          value={charLists.type}
          onChange={(e) => setChartLists((s) => ({ ...s, type: e.target.value }))}>
          <Radio.Button value={1}>Month</Radio.Button>
          <Radio.Button value={3}>Week</Radio.Button>
          <Radio.Button value={4}>Custom</Radio.Button>
        </Radio.Group>

        {charLists.type === 4 && (
          <DatePicker.RangePicker
            className='date-picker-range-chart'
            getPopupContainer={() => chartWrapperRef.current || document.body}
            disabledDate={disabledDate}
            onOpenChange={() => (!dates || !dates[0] || !dates[1]) && setDates(null)}
            onCalendarChange={(dates) => setDates(dates)}
            onChange={(value) =>
              setChartLists((s) => ({
                ...s,
                type: 4,
                start_date: value ? value[0]?.format('YYYY-MM-DD') || '' : '',
                end_date: value ? value[1]?.format('YYYY-MM-DD') || '' : '',
              }))
            }
          />
        )}
      </FilterBox_wrapper>
      {charLists.data?.some((i) => i.value >= 0) ? (
        <Line {...config} />
      ) : (
        <NoStatistical_wrapper>No Statistical</NoStatistical_wrapper>
      )}
    </>
  );
};

const FilterBox_wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .ant-select {
    width: 250px;
  }
  .ant-picker-range-wrapper {
    .ant-picker-cell-in-view.ant-picker-cell-range-start {
      pointer-events: none;
    }
  }
`;

const NoStatistical_wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 328px;
`;

export default ChartComponent;
