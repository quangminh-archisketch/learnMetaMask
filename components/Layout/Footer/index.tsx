import { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { AppState } from 'store/type';
import { SaveWebSettings } from 'store/reducer/web';

import commonServices from 'services/common-services';

import Icon from 'components/Fragments/Icons';
import SocialInBanner from 'components/Fragments/SocicalBanner';

import { ContainerLarge } from 'styles/__styles';
import * as SC from './style';

const menus = [
  {
    group: 'Company',
    menuItems: [
      { title: 'Blog', url: '/blog/all' },
      { title: 'Careers', url: '/' },
      { title: 'Help Center', url: '/help-center' },
      { title: 'Contact Us', url: '/contact-us' },
    ],
  },
  {
    group: 'Buy 3D Models',
    menuItems: [
      { title: 'Free 3D Models', url: '/free-models/all' },
      { title: 'Best Selling', url: '/explore/all?sort=best-selling' },
      { title: 'Sale Off 50%', url: '/sale-off/all' },
      { title: '3D Modeling Service', url: '/' },
    ],
  },
  {
    group: 'Resources',
    menuItems: [
      { title: 'Model Playground', url: 'https://modelviewer.vrstyler.com' },
      // { title: 'Terms of Service', url: '/' },
      {
        title: 'User Agreement',
        url: 'https://vrstyler.com/help-center/privacy-legal--2ad9ed3e-e784-4e1b-8f9a-12f26a3a1367/user-agreement--f706b8f1-0bcb-4a23-af40-e8290fd7f3ba',
      },
      {
        title: 'Privacy Policy',
        url: 'https://vrstyler.com/help-center/privacy-legal--2ad9ed3e-e784-4e1b-8f9a-12f26a3a1367/privacy-policy--4bc287f7-3fea-4b20-ad96-d64ed3f32780',
      },
    ],
  },
];

type Props = {
  style?: CSSProperties;
};

const Footer = ({ style }: Props) => {
  const dispatch = useDispatch();
  const settings = useSelector((state: AppState) => state.web.setting);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { error, data } = await commonServices.webSettings();
        if (!error) dispatch(SaveWebSettings(data));
      } catch (error) {}
    };

    if (!settings) fetchSettings();
  }, []);

  return (
    <SC.Footer_Wrapper style={style}>
      <div className='footer__background'>
        <ContainerLarge>
          <SC.FooterContent>
            <SC.MenuSection>
              {menus.map((menu, index) => {
                return (
                  <SC.MenuGroup key={index}>
                    <h2>{menu.group}</h2>

                    {menu.menuItems.map((menu_item, index2) => {
                      return (
                        <SC.MenuItem key={index + '-' + index2}>
                          <Link href={menu_item.url}>{menu_item.title}</Link>
                        </SC.MenuItem>
                      );
                    })}
                  </SC.MenuGroup>
                );
              })}
            </SC.MenuSection>

            <SC.Social>
              <div className='logo'>
                <Link href={'/'}>
                  <a>
                    <Icon iconName='logo-white' />
                  </a>
                </Link>
              </div>
              <SocialInBanner size='large' color='var(--color-gray-1)' />
            </SC.Social>
          </SC.FooterContent>
        </ContainerLarge>
      </div>
    </SC.Footer_Wrapper>
  );
};

export default Footer;
