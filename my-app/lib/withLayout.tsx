import React, { useState } from 'react';
import { AppProps } from 'next/app';

import Header from 'components/layout/Header';
import SideBar from 'components/layout/Sidebar';
import Page403 from 'components/fragments/Page403';
import ProgressBarScrollPage from 'components/fragments/ProgressBarScrollPage';

import { userType } from 'models/auth.model';

import * as L from 'styles/__layout';

interface SSRComponentElements {
  getInitialProps?: () => Promise<any>;
}

type SSRProps = {};

export type WithLayoutProps = SSRProps & {};

type propsLayoutType = {
  sidebar: { openKeys?: string[]; selectedKey?: string };
};

const withLayout = (
  BaseComponent: React.ComponentType<WithLayoutProps | undefined | any> & SSRComponentElements,
  propsLayout?: propsLayoutType | undefined
) => {
  const App = (props: AppProps | userType | any) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(() => {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem('menuCollapsed')
          ? sessionStorage.getItem('menuCollapsed') === '1'
          : true;
      } else return true;
    });

    if (!props.allowAccess) {
      return <Page403 />;
    }

    return (
      <>
        <L.LayoutHeader
          style={{
            width: `calc(100% - ${menuOpen ? 208 : 48}px)`,
            left: `${menuOpen ? 208 : 48}px`,
          }}>
          <Header />
          <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <ProgressBarScrollPage />
          </div>
        </L.LayoutHeader>
        <L.LayoutSidebar>
          <SideBar
            menuActive={{
              openKey: propsLayout?.sidebar.openKeys || [''],
              selectedKey: propsLayout?.sidebar.selectedKey || '',
            }}
            menuOpen={menuOpen}
            onOpenMenu={() => setMenuOpen(!menuOpen)}
          />
        </L.LayoutSidebar>
        <L.LayoutContent id='content-page' isOpen={menuOpen}>
          <BaseComponent {...props} />
        </L.LayoutContent>
      </>
    );
  };

  return App;
};

export default withLayout;
