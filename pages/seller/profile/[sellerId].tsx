import { useSelector } from 'react-redux';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import sellerServices from 'services/seller-services';

import { AppState } from 'store/type';

import withLayout from 'lib/withLayout';
import { checkAuth } from 'lib/utils/auth';

import SideBar from 'components/Pages/ProfileSeller/SideBar';
import ContentComponent from 'components/Pages/ProfileSeller/Content';

import { UserSellerModel } from 'models/profileSeller';

import config from 'config';

import styled from 'styled-components';
import { Container } from 'styles/__styles';
import { maxMedia } from 'styles/__media';

type Props = {
  profileSeller: {
    market_users: UserSellerModel[] | null;
    market_reviews_aggregate: {
      aggregate: {
        avg: {
          rate: number;
        };
      };
    };
  };
  sellerId: string;
};

const Home = (props: Props) => {
  const { profileSeller, sellerId } = props;

  const auth = useSelector((state: AppState) => state.auth);

  return (
    <>
      <Head>
        <title>
          {profileSeller?.market_users ? profileSeller?.market_users[0]?.name : ''} |{' '}
          {config.websiteName}
        </title>
      </Head>
      <ProfileSellerPage_Wrapper>
        <Container>
          <ProfileSellerPage_Layout>
            <ProfileSellerPage_Content>
              <SideBar
                profileSeller={profileSeller?.market_users ? profileSeller?.market_users[0] : null}
                rating={profileSeller?.market_reviews_aggregate}
                auth={auth}
              />
            </ProfileSellerPage_Content>

            <ProfileSellerPage_Content>
              <ContentComponent sellerId={sellerId} />
            </ProfileSellerPage_Content>
          </ProfileSellerPage_Layout>
        </Container>
      </ProfileSellerPage_Wrapper>
    </>
  );
};

const ProfileSellerPage_Wrapper = styled.div`
  padding: 30px 0 20px;

  ${maxMedia.medium} {
    padding-bottom: 0;
    padding-top: 0;

    & > div {
      padding: 0;
    }
  }

  .ant-spin {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ProfileSellerPage_Layout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;

  gap: 0 20px;

  ${maxMedia.medium} {
    display: block;
  }
`;

const ProfileSellerPage_Content = styled.div`
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 90px;
  border-radius: 5px;
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);

  ${maxMedia.medium} {
    position: initial;
    box-shadow: none;
  }
`;

export const getServerSideProps: GetServerSideProps = async (content) => {
  let props: any = {};
  const sellerId = content.query.sellerId || '';
  let auth = null,
    profileSeller = null;

  await Promise.all([
    checkAuth((content.req ? content.req.headers.cookie : window.document.cookie) || ''),
    sellerServices.getProfile((sellerId as string) || ''),
  ])
    .then((data) => {
      auth = data[0] || null;
      profileSeller = data[1].data || null;
    })
    .catch((error) => {
      console.log('error: ', error);
    });

  return { props: { auth, profileSeller, sellerId, ...props } };
};

export default withLayout(Home);
