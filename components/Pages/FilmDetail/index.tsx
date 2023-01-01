import { useState } from 'react';

import { Button, Progress, Space, Modal } from 'antd';

import { FilmDetailModel } from 'models/film-models';

import styled from 'styled-components';
import moment from 'moment';

const FilmDetailComponent = (props: FilmDetailModel) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <figure className='movie'>
        <div className='movie__hero'>
          <img
            src={props.filmDetail?.hinhAnh}
            alt={props.filmDetail?.tenPhim}
            className='movie__img'
          />
        </div>
        <div className='movie__content'>
          <div className='movie__title'>
            <h1 className='heading__primary'>{props.filmDetail?.tenPhim}</h1>
            {props.filmDetail?.hot ? <div className='movie__tag movie__tag--2'>HOT</div> : ''}
            {props.filmDetail?.dangChieu ? (
              <div className='movie__tag movie__tag--1'>ĐANG CHIẾU</div>
            ) : (
              <div className='movie__tag movie__tag--1'>SẮP CHIẾU</div>
            )}
          </div>
          <div className='movie__details'>
            <p className='movie__detail'>
              <span className='icons icons-grey'>
                <i className='fas fa-clock' />{' '}
              </span>
              {moment(props.filmDetail?.ngayKhoiChieu).format('MMMM Do YYYY')}
            </p>
          </div>
          <div className='film-des'>
            <p className='movie__description'>{props.filmDetail?.moTa}</p>
            <Space wrap>
              <Progress type='circle' percent={props.filmDetail?.danhGia} />
            </Space>
          </div>
        </div>
        <Button className='btn-trailer' onClick={showModal}>
          {' '}
          <div className='movie__price'>Trailer</div>
        </Button>
      </figure>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}>
        <iframe width='100%' height='500px' src={props.filmDetail?.trailer}></iframe>
      </Modal>
    </Wrapper>
  );
};

export default FilmDetailComponent;

const Wrapper = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #444;
  background: linear-gradient(to right bottom, #a9c9ff 0%, #ffbbec 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .film-des {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .movie {
    max-width: 900px;
    border-radius: 5px;
    display: flex;
    box-shadow: 0 5px 20px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .movie__hero {
    flex: 0 0 45%;
  }

  .movie__img {
    width: 100%;
    display: block;
  }

  .movie__content {
    background-color: #fff;
    flex: 1;
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
  }

  .btn-trailer {
    background: linear-gradient(to bottom, #a9c9ff 0%, #ffbbec 100%);
    flex: 0 0 50px;
    .movie__price {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      color: rgb(255, 255, 255);
      writing-mode: vertical-lr;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .movie__title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .heading__primary {
    font-size: 28px;
    margin-right: auto;
    color: royalblue;
  }

  .fa-fire {
    color: salmon;
  }

  .movie__tag {
    font-size: 15px;
    color: #fff;
    padding: 2px 7px;
    border-radius: 100px;
    margin-right: 8px;
    display: block;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .movie__tag--1 {
    background-color: #6c9df3;
  }

  .movie__tag--2 {
    background-color: #f9799d;
  }

  .movie__description {
    font-size: 18px;
  }

  .movie__details {
    display: flex;
  }

  .movie__detail {
    font-size: 15px;
    margin-right: 20px;
    font-weight: 500;
  }

  .icons i {
    margin-right: 3px;
    font-size: 18px;
  }

  .icons-red {
    color: salmon;
  }
  .icons-grey {
    color: grey;
  }

  .icons-yellow {
    color: rgb(190, 190, 71);
  }
`;
