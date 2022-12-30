import { Button, Card, Col, Row } from 'antd';
import { ListFilm } from 'models/theater-models';
import moment from 'moment';
import styled from 'styled-components';

type Props = {
  film: ListFilm;
};

const ListFilm = (props: Props) => {
  return (
    <Wrapper>
      <Card
        cover={<img className='cover-card' alt={props.film?.tenPhim} src={props.film?.hinhAnh} />}>
        <div className='my-5 site-card-wrapper'>
          <div className='ml-5'>
            <div className='title-card'>
              <h1 className='text-1xl text-green-700 mb-3 tenphim'>{props.film?.tenPhim}</h1>
              <div className='btn'>
                <Button type='primary' danger>
                  Mua Vé
                </Button>
              </div>
            </div>
            <div className='card-time'>
              {props.film?.lstLichChieuTheoPhim.map((showtime) => {
                return (
                  <>
                    <Card className='card-time-info'>
                      <p>{moment(showtime.ngayChieuGioChieu).format('MMM Do YYYY')}</p>
                    </Card>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default ListFilm;

const Wrapper = styled.div`
  .cover-card {
    height: 350px;
  }
  .card-time {
    display: flex;
    flex-wrap: wrap;
    .card-time-info {
      background-color: beige;
      margin-right: 10px;
      margin-top: 5px;
      width: 200px;
    }
  }
  .title-card {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
