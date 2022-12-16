import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Spin } from 'antd';

import useDebounce from 'hooks/useDebounce';
import useWindowSize from 'hooks/useWindowSize';
import blogServices, { GetBlogBody } from 'services/blog-services';

import HelpCenterHeader from './Header';
import HelpCenterCategoryList from './BlogTab';
import HelpCenterList from './List';

import { BlogCategory, BlogModel } from 'models/blog.models';

import styled from 'styled-components';
import { Container } from 'styles/__styles';

const BlogComponent = ({ category }: { category: BlogCategory[] }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [textSearch, setTextSearch] = useState<string>('');
  const [data, setData] = useState<BlogModel[]>();
  const [page, setPage] = useState<number>(1);

  const [screenW] = useWindowSize();

  const debouncedTextSearch = useDebounce<string>(textSearch, 500);

  const pageSize: number = screenW <= 991 ? 6 : screenW <= 640 ? 6 : screenW <= 480 ? 6 : 8;

  useEffect(() => {
    fetchData();
  }, [router.query.category, debouncedTextSearch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let param: GetBlogBody = {};
      const categoryId: string = router.query.category?.toString().split('--')[1] || '';
      if (router.query.category?.toString().split('--')[1]) {
        param.category = categoryId;
      }
      if (textSearch.trim()) {
        param.title = textSearch;
      }
      const { error, data } = await blogServices.getList(param);
      if (!error) {
        setPage(1);
        setData(data);
      }
      setLoading(false);
    } catch (error) {}
  };

  return (
    <HelpCenter__Wrapper>
      <Container>
        <HelpCenterHeader onSearch={(value) => setTextSearch(value)} />
        <HelpCenterCategoryList categoryList={category} />
        <Spin spinning={loading} style={{ minHeight: 100 }}>
          <HelpCenterList
            blogList={data?.slice(0, page * pageSize)}
            highlight={debouncedTextSearch.toLowerCase()}
          />
        </Spin>
        {data && data?.length > page * pageSize && (
          <div className='blog-button-see-more'>
            <Button type='primary' onClick={() => setPage((page) => page + 1)}>
              See More
            </Button>
          </div>
        )}
      </Container>
    </HelpCenter__Wrapper>
  );
};
export default BlogComponent;

const HelpCenter__Wrapper = styled.main`
  padding-bottom: 50px;

  .blog-button-see-more {
    margin-top: 50px;
    text-align: center;
    .ant-btn {
      width: 224px;
      height: 41px;
    }
  }
`;
