import { Alert } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import ArticleForm, {
  ArticleFormValues,
} from "../../components/ArticleForm/ArticleForm";
import { useAuth } from "../../hooks/hooks";
import {
  useEditArticleMutation,
  useGetArticleBySlugMutation,
} from "../../services/BlogService";
import { extractError } from "../../services/helpers";
import { IArticle } from "../../types/IArticle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px;
  max-width: 938px;
  margin: 0 auto;
  margin-top: 33px;
  box-shadow: 0px 22px 106px rgba(0, 0, 0, 0.07),
    0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198),
    0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275),
    0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035),
    0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725),
    0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802);
  font-family: "Roboto";
  background-color: #fff;
`;

function mapArticleToValues(article: IArticle): ArticleFormValues {
  const { title, description, body, tagList } = article;
  return {
    title,
    description,
    text: body,
    tags: tagList,
  };
}

const EditArticlePage = () => {
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const [
    getArticle,
    { data: articleData, error: articleError, isLoading: articleIsLoading },
  ] = useGetArticleBySlugMutation();

  const [
    editArticle,
    { isSuccess: isEditSuccess, error: editError, isLoading: editIsLoading },
  ] = useEditArticleMutation();

  const initialValues: Partial<ArticleFormValues> = useMemo(() => {
    if (!articleData) return {};

    return mapArticleToValues(articleData.article);
  }, [articleData]);

  const onSubmit = async (data: ArticleFormValues) => {
    if (!user) return;

    const { token } = user;
    const { title, description, text, tags } = data;

    editArticle({ token, slug, title, description, body: text, tagList: tags });
  };

  useEffect(() => {
    getArticle({ slug });
  }, [slug]);

  if (articleError) {
    return (
      <Wrapper>
        <Alert type="error" message={extractError(articleError)} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!articleIsLoading && (
        <ArticleForm
          title="Edit article"
          isError={Boolean(editError)}
          isSuccess={isEditSuccess}
          isLoading={editIsLoading}
          submitButtonText="Edit"
          successMessage="Successfully edited!"
          errorMessage={extractError(editError)}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      )}
    </Wrapper>
  );
};

export default EditArticlePage;
