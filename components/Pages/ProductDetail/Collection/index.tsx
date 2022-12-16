import { createRef } from 'react';

import { Button, Carousel } from 'antd';
import {
  LikeOutlined,
  CommentOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import Icon from 'components/Fragments/Icons';

import * as L from './style';

const Collection = () => {
  const settings: any = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    draggable: true,
    autoPlay: false,
  };

  let carousel: any = createRef();

  return (
    <>
      <div className='line' />
      <L.Title_wrapper>More From This Collection</L.Title_wrapper>

      <L.Card_wrapper>
        <Button className='arrow arrow--prev' onClick={() => carousel.prev()}>
          <ArrowLeftOutlined />
        </Button>
        <Carousel className='slider__desktop' {...settings} ref={(node) => (carousel = node)}>
          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Game</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Animal</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Weapon</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Fashion & Style</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Game</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Animal</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Weapon</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>

          <L.Card_item>
            <div className='card__header'>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
              <div className='header__item'>
                <img
                  src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                  alt=''
                />
              </div>
            </div>

            <div className='card__footer'>
              <div className='footer__content'>
                <div className='logo'>
                  <Icon iconName='icon-logo' />
                  <span>Fashion & Style</span>
                </div>
                <div className='review'>
                  <div className='review__item'>
                    <LikeOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                  <div className='review__line'></div>
                  <div className='review__item'>
                    <CommentOutlined />
                    <span className='review__item--text'>156</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='card__line'></div>
            <div className='card__line'></div>
          </L.Card_item>
        </Carousel>

        <div className='ant-carousel slider__mobile'>
          <div className='slider'>
            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Game</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Animal</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Weapon</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Fashion & Style</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Game</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Animal</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Weapon</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>

            <L.Card_item>
              <div className='card__header'>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
                <div className='header__item'>
                  <img
                    src='https://media.sketchfab.com/models/96340701c2ed4d37851c7d9109eee9c0/thumbnails/49a0ec6cf1834d21a0f0e08201f2a899/74f213a309104e22916c48282b6b27ae.jpeg'
                    alt=''
                  />
                </div>
              </div>

              <div className='card__footer'>
                <div className='footer__content'>
                  <div className='logo'>
                    <Icon iconName='icon-logo' />
                    <span>Fashion & Style</span>
                  </div>
                  <div className='review'>
                    <div className='review__item'>
                      <LikeOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                    <div className='review__line'></div>
                    <div className='review__item'>
                      <CommentOutlined />
                      <span className='review__item--text'>156</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card__line'></div>
              <div className='card__line'></div>
            </L.Card_item>
          </div>
        </div>
        <Button className='arrow arrow--next' onClick={() => carousel.next()}>
          <ArrowRightOutlined />
        </Button>
      </L.Card_wrapper>
    </>
  );
};

export default Collection;
