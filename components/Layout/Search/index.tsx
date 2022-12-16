import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/type';
import { CloseSearch } from 'store/reducer/modal';

import { Button, Drawer, Input, InputRef } from 'antd';

import useWindowSize from 'hooks/useWindowSize';
import urlPage from 'constants/url.constant';
import { convertToHighlightText } from 'common/functions';

import Icon from 'components/Fragments/Icons';

import { Container } from 'styles/__styles';
import * as SC from './style';

const tags = [
  'Car',
  'Character',
  'Monster',
  'Stylized',
  'Chair',
  'Bed',
  'Game Package',
  'Animal',
  'Lowpoly Model',
  'Foliage',
];

const SearchDrawer = () => {
  const dispatch = useDispatch();
  const [screenW] = useWindowSize();
  const visible = useSelector((state: AppState) => state.modal.search);

  const router = useRouter();

  const [keySearch, setKeySearch] = useState<string>('');
  const [suggest, setSuggest] = useState<string[]>([]);

  const inputRef = useRef<InputRef>(null);

  const onChangeVisible = (visible: boolean) => {
    if (visible) {
      inputRef.current?.focus();
      document.body.style.overflowY = 'hidden';
    } else {
      inputRef.current?.blur();
      document.body.style.removeProperty('overflow-y');
    }
  };

  const getSuggest = () => {
    // const arr = [...tags].filter((i) => i.toLowerCase().includes(keySearch.trim().toLowerCase()));
    // setSuggest(arr);
  };

  useEffect(() => {
    if (keySearch.trim()) getSuggest();
    else setSuggest([]);
  }, [keySearch]);

  const onSearch = () => {
    dispatch(CloseSearch());
    router.push('/explore/all?s=' + keySearch.trim());
  };

  return (
    <Drawer
      placement={screenW <= 991 ? 'right' : 'top'}
      closable={false}
      height='100%'
      width='100%'
      drawerStyle={{ zIndex: 1001 }}
      bodyStyle={{ padding: '0' }}
      visible={visible}
      onClose={() => dispatch(CloseSearch())}
      afterVisibleChange={onChangeVisible}>
      <SC.Wrapper>
        <SC.SearchBox>
          <Container className='box-search_content'>
            <SC.BtnIcon onClick={onSearch}>
              <Icon iconName='search' />
            </SC.BtnIcon>
            <Input
              ref={inputRef}
              placeholder='Search'
              bordered={false}
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
              onPressEnter={onSearch}
            />
            <SC.BtnIcon onClick={() => dispatch(CloseSearch())}>
              <Icon iconName='close' />
            </SC.BtnIcon>
          </Container>
        </SC.SearchBox>

        <SC.SearchExpand>
          <Container>
            {suggest?.length > 0 && (
              <SC.SearchRecommend>
                {suggest?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={'/'}>
                        <a
                          dangerouslySetInnerHTML={{
                            __html: convertToHighlightText(item, keySearch.trim()),
                          }}
                        />
                      </Link>
                    </li>
                  );
                })}
              </SC.SearchRecommend>
            )}

            <SC.SearchPopular>
              <h4>Popular</h4>
              <div className='tag-list'>
                {tags.map((tag, index) => {
                  const link =
                    urlPage.explore.replace('{category}', 'all') + `?s=${tag.replace(/\s/g, '+')}`;
                  return (
                    <Button
                      key={index}
                      className='tag-item'
                      type='text'
                      onClick={() => dispatch(CloseSearch())}>
                      <Link href={link}>{tag}</Link>
                    </Button>
                  );
                })}
              </div>
            </SC.SearchPopular>
          </Container>
        </SC.SearchExpand>
      </SC.Wrapper>
    </Drawer>
  );
};

export default SearchDrawer;
