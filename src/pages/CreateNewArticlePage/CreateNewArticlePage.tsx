import styled from "styled-components";
import ArticleForm, {
  ArticleFormValues,
} from "../../components/ArticleForm/ArticleForm";
import { useAuth } from "../../hooks/hooks";
import { useCreateArticleMutation } from "../../services/BlogService";
import { extractError } from "../../services/helpers";

const Wrapper = styled.div`
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

const CreateNewArticlePage = () => {
  const { user } = useAuth();
  const [
    createArticle,
    { isSuccess: isCreateSuccess, error: createError, isLoading },
  ] = useCreateArticleMutation();

  const onSubmit = async (data: ArticleFormValues) => {
    if (!user) return;

    const { token } = user;
    const { title, description, text, tags } = data;
    createArticle({ token, title, description, body: text, tagList: tags });
  };

  return (
    <Wrapper>
      <ArticleForm
        title="Create new article"
        isError={Boolean(createError)}
        isSuccess={isCreateSuccess}
        isLoading={isLoading}
        submitButtonText="Create"
        successMessage="Successfully created!"
        errorMessage={extractError(createError)}
        onSubmit={onSubmit}
      />
    </Wrapper>
  );
};

export default CreateNewArticlePage;
