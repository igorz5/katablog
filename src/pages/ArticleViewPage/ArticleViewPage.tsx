import { useParams } from "react-router";
import { Alert, Spin } from "antd";
import styled from "styled-components";
import MDReactComponent from "markdown-react-js";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import { useGetArticleBySlugQuery } from "../../services/BlogService";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Article = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
`;

const PreviewWrap = styled.div`
  margin-bottom: 10px;
`;

const ArticleViewPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useGetArticleBySlugQuery(slug);

  if (isError) {
    return (
      <Wrapper>
        <Alert type="error" message="Something went wrong." />
      </Wrapper>
    );
  }

  if (isLoading || !data || !data.article) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Article>
        <PreviewWrap>
          <ArticlePreview data={data.article} />
        </PreviewWrap>
        <MDReactComponent text={data.article.body} />
      </Article>
    </Wrapper>
  );
};

export default ArticleViewPage;
