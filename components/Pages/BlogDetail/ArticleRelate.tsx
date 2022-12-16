import { useEffect, useState } from 'react';
import styled from 'styled-components';

import blogServices from 'services/blog-services';

import BlogCard from 'components/Fragments/BlogCard';
import { BlogModel } from 'models/blog.models';
import { maxMedia } from 'styles/__media';

const ArticleRelateBlog = ({
  articleId,
  categoryId,
}: {
  articleId: string;
  categoryId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BlogModel[]>();

  useEffect(() => {
    fetchData();
  }, [articleId, categoryId]);

  const fetchData = async () => {
    setLoading(true);
    await blogServices
      .getArticleRelate(articleId, categoryId, 2)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  if (loading) return <div />;

  return (
    <Wrapper>
      {data?.map((article) => {
        return <BlogCard key={article.id} data={article} />;
      })}
    </Wrapper>
  );
};
export default ArticleRelateBlog;

const Wrapper = styled.div`
  margin: 30px 0 0 30px;
  width: 298px;
  display: flex;
  flex-direction: column;
  ${maxMedia.medium} {
    flex-wrap: nowrap;
    margin: 30px auto;
    width: auto;
  }
  ${maxMedia.small} {
    flex-wrap: wrap;
    margin: 20px auto;
    width: auto;
  }
  ${maxMedia.xsmall} {
    margin: 20px 0 0 0;
    flex-wrap: wrap;
    width: auto;
  }
`;
