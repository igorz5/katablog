import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Alert, Spin } from "antd";
import styled from "styled-components";
import MDReactComponent from "markdown-react-js";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import {
  useDeleteArticleMutation,
  useGetArticleBySlugMutation,
} from "../../services/BlogService";
import { extractError } from "../../services/helpers";
import { useAuth } from "../../hooks/hooks";

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
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  const [
    getArticle,
    { data: articleData, isLoading: articleIsLoading, error: articleError },
  ] = useGetArticleBySlugMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const isOwn = user?.username === articleData?.article.author.username;

  useEffect(() => {
    getArticle({ slug, token: user?.token });
  }, [user, slug]);

  if (articleError) {
    return (
      <Wrapper>
        <Alert type="error" message={extractError(articleError)} />
      </Wrapper>
    );
  }

  if (articleIsLoading) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  const onEdit = () => {
    if (!user || !articleData) return;

    history.push(`/articles/${articleData.article.slug}/edit`);
  };

  const onDelete = async () => {
    if (!user || !articleData) return;

    const { token } = user;
    const { slug } = articleData.article;

    await deleteArticle({ token, slug });
    history.push("/");
  };

  return (
    <Wrapper>
      <Article>
        {articleData && (
          <>
            <PreviewWrap>
              {articleData && (
                <ArticlePreview
                  data={articleData.article}
                  showControls={isOwn}
                  full={true}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )}
            </PreviewWrap>
            <MDReactComponent text={articleData.article.body} />
          </>
        )}
      </Article>
    </Wrapper>
  );
};

export default ArticleViewPage;
