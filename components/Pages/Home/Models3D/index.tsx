import { Button } from 'antd';
import Link from 'next/link';

import { Container } from 'styles/__styles';

import * as L from './style';

const Models3D: React.FC = () => {
  return (
    <L.Models_wrapper>
      <Container>
        <L.Title_wrapper>
          <h3 className='title section__title '>Marketplace 3D Models</h3>
          <p className='sub_title'>
            VRStyler provides many 3D models with different genres, AR/VR, you can download and
            use them as your own.All models are categorized by menu. Discover now!
          </p>
        </L.Title_wrapper>
        <L.Grid_wrapper>
          <div className='item item-1'>
            <img src='static/images/homepage/models-1.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-2.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-3.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-4.jpg' alt='' />

            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-5.jpg' alt='' />

            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-6.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-7.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-8.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
          <div className='item'>
            <img src='static/images/homepage/models-9.jpg' alt='' />
            <Link href='#'>
              <a>
                <Button>View All</Button>
              </a>
            </Link>
          </div>
        </L.Grid_wrapper>
        <div className='text-center'>
          <Button className='btn__more' type='primary' shape='round'>
            <Link href='#'>
              <a>More Marketplace</a>
            </Link>
          </Button>
        </div>
      </Container>
    </L.Models_wrapper>
  );
};

export default Models3D;
