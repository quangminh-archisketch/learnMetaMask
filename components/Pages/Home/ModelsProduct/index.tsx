import { Button } from 'antd';
import Link from 'next/link';

import { Container } from 'styles/__styles';
import * as L from './style';

const ModelsProduct: React.FC = () => {
  return (
    <L.Models_wrapper>
      <Container>
        <h3 className='title section__title section__title--mobile'>
          Models for any
          <span> product category</span>
        </h3>

        <L.Box_wrapper>
          <ul>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-1.png' alt='' />
                  <p>Furniture & Home</p>
                </a>
              </Link>
            </li>

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-2.png' alt='' />
                  <p>People</p>
                </a>
              </Link>
            </li>

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-3.png' alt='' />
                  <p>Art & Abstract</p>
                </a>
              </Link>
            </li>

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-4.png' alt='' />
                  <p>Cars & Vehicles</p>
                </a>
              </Link>
            </li>

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-5.png' alt='' />
                  <p>Characters & Creatures</p>
                </a>
              </Link>
            </li>

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-6.png' alt='' />
                  <p>Weapons & Military</p>
                </a>
              </Link>
            </li>

            {/* <div className='column__border'></div> */}

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-7.png' alt='' />
                  <p>Music</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-8.png' alt='' />
                  <p>Animals</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-9.png' alt='' />
                  <p>Fashion & Style</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-10.png' alt='' />
                  <p>Nature & Plants</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-11.png' alt='' />
                  <p>News & Politics</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-12.png' alt='' />
                  <p>Food & Drink</p>
                </a>
              </Link>
            </li>

            {/* <div className='column__border'></div> */}

            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-7.png' alt='' />
                  <p>Cultural Heritage & History</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-8.png' alt='' />
                  <p>Places & Travel</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-9.png' alt='' />
                  <p>Science & Technology</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-10.png' alt='' />
                  <p>Sports & Fitness</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-11.png' alt='' />
                  <p> Electronics & Gadgets</p>
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link href='#'>
                <a>
                  <img src='static/images/homepage/icon-product-12.png' alt='' />
                  <p>Architecture</p>
                </a>
              </Link>
            </li>
          </ul>
        </L.Box_wrapper>

        <div className='text-center'>
          <Button className='btn__more' type='primary' shape='round'>
            <Link href='#'>
              <a>Shop Now</a>
            </Link>
          </Button>
        </div>
      </Container>
    </L.Models_wrapper>
  );
};

export default ModelsProduct;
