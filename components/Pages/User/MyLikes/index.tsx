import { useEffect, useState } from 'react';

import Head from 'next/head';

import { Spin } from 'antd';

import config from 'config';

import likeServices from 'services/like-services';

import HeaderPage from '../Fragments/HeaderPage';
import MyLikeItem from './Fragments/Item';

import { LikeProductModel } from 'models/like.models';
import { UserPageLikesProps } from 'models/user.models';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';
import ResultEmpty from 'components/Fragments/ResultEmpty';

const MyLikes = (props: UserPageLikesProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<LikeProductModel[]>();

  useEffect(() => {
    const getMyLike = async () => {
      try {
        const { error, data } = await likeServices.getLikes();
        if (!error) setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getMyLike();
  }, []);

  return (
    <>
      <Head>
        <title>My Likes | {config.websiteName}</title>
      </Head>

      <MyLikes_wrapper>
        <HeaderPage title='Model liked' total={data?.length} />
        {!isLoading && data?.length === 0 && (
          <ResultEmpty description='You have not liked any products' />
        )}
        <Spin spinning={isLoading}>
          <ListItem_wrapper style={{ minHeight: isLoading ? 300 : 'inherit' }}>
            {data?.map((item) => (
              <MyLikeItem key={item.id} data={item} auth={props.auth} />
            ))}
          </ListItem_wrapper>
        </Spin>
      </MyLikes_wrapper>
    </>
  );
};

const MyLikes_wrapper = styled.div`
  padding: 20px 40px;

  ${maxMedia.medium} {
    padding: 20px;
  }
`;

const ListItem_wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  gap: 2rem 2rem;

  margin-top: 2.6rem;

  ${maxMedia.small} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 5rem;

    .card__item {
      flex-shrink: 0;
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  ${maxMedia.tiny} {
    grid-template-columns: 100%;
  }
`;

export default MyLikes;
