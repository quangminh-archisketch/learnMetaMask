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
    group: 'Introduction',
    menuItems: [
      { title: 'About', url: '/about' },
      { title: 'Contact Us', url: '/contact-us' },
      { title: 'Manager', url: '/manager' },
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
