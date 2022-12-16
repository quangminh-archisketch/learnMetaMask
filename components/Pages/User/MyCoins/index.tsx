import { UserPageCoinsProps } from 'models/user.models';

import HeaderPage from '../Fragments/HeaderPage';
import PopoverComponent from '../Fragments/PopoverComponent';

import UserPageTabContent from '../Layout/TabContent';

import CardItem from './CardItem';

import styled from 'styled-components';
import { maxMedia } from 'styles/__media';

const MyCoins = (props: UserPageCoinsProps) => {
  return (
    <>
      <Header_wrapper>
        <img
          src='/static/images/my-orders/big-dollar.png'
          className='header__img'
          alt=''
          loading='lazy'
        />

        <HeaderPage title='Coins are available' total={'$000.000'} />

        <PopoverComponent
          content={
            <>
              The <span>Coin</span> value received is equivalent to the <span>Dollar</span> value.
              After you Cancel your order, the money will be converted into Refundable Coins. You
              can use this Coin to <span>continue buying</span> in your next order!
            </>
          }
        />
      </Header_wrapper>

      <UserPageTabContent
        tabs={[
          {
            title: 'All',
            url: '/user/coins/all',
            active: [null, 'all'].includes(props.tabName),
          },
          { title: 'Received', url: '/user/coins/received', active: props.tabName === 'received' },
          { title: 'Used', url: '/user/coins/used', active: props.tabName === 'used' },
        ]}
      />

      <Content_wrapper>
        <CardItem />
      </Content_wrapper>
    </>
  );
};

const Header_wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem 4rem;

  .header__img {
    width: 10rem;
    height: 10rem;
  }

  ${maxMedia.medium} {
    padding: 2rem;
  }

  ${maxMedia.small} {
    gap: 1rem;

    .header__img {
      width: 5.2rem;
      height: 5.2rem;
    }
  }
`;

const Content_wrapper = styled.div`
  padding: 0 4rem;
  padding-bottom: 4rem;

  ${maxMedia.medium} {
    padding: 0 2rem;
    padding-bottom: 2rem;
  }
`;

export default MyCoins;
