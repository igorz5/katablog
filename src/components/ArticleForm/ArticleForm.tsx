import { ChangeEvent, FC, useState, useMemo } from "react";
import { Alert } from "antd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../UI/Form/Form";
import FormButton from "../UI/FormButton/FormButton";
import FormInput from "../UI/FormInput/FormInput";
import FormTextArea from "../UI/FormTextArea/FormTextArea";
import FormLabel from "../UI/FormLabel/FormLabel";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const FormBottom = styled.div`
  width: 100%;
  display: flex;
  margin-right: auto;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const TagsWrap = styled.div`
  width: 100%;
  margin-bottom: 21px;
`;

const TagsList = styled.ul`
  margin-bottom: 0;
`;

const TagItem = styled.li`
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const TagInner = styled.div`
  display: flex;
  height: 40px;

  @media screen and (max-width: 768px) {
    height: auto;
    flex-direction: column;
  }
`;

const TagInput = styled(Input).attrs({ placeholder: "Tag" })`
  width: 50%;
  max-width: 300px;
  margin-right: 17px;
  min-width: 160px;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-bottom: 5px;
  }
`;

const TagButton = styled(Button)`
  padding: 8px 32px;
  font-size: 16px;
  line-height: 24px;
  height: 100%;
  white-space: nowrap;
`;

const AddTagButton = styled(TagButton).attrs({
  color: "#1890FF",
  type: "button",
})`
  margin-top: auto;
`;

const ErrorText = styled.p`
  color: #f5222d;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 6px;
  margin-top: 5px;
`;

const StyledFormButton = styled(FormButton)`
  max-width: 319px;
  width: 100%;
  margin-bottom: 0;
  margin-right: 21px;

  @media screen and (max-width: 768px) {
    max-width: none;
    margin-right: 0;
  }
`;

const StyledAlert = styled(Alert)`
  @media screen and (max-width: 768px) {
    margin-top: 21px;
  }
`;

export interface ArticleFormValues {
  title: string;
  description: string;
  text: string;
  tags: string[];
}

export interface ArticleFormProps {
  title: string;
  submitButtonText?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
  initialValues?: Partial<ArticleFormValues>;
  onSubmit?: (data: ArticleFormValues) => unknown | Promise<unknown>;
}

const ArticleForm: FC<ArticleFormProps> = ({
  title,
  submitButtonText,
  isLoading,
  isError,
  isSuccess,
  errorMessage,
  successMessage,
  initialValues,
  onSubmit = () => {},
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    defaultValues: initialValues,
  });

  const initialTags = initialValues?.tags || [];
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTagName, setNewTagName] = useState<string>("");

  const submitHandler = useMemo(() => {
    return handleSubmit(onSubmit);
  }, [onSubmit]);

  const addTag = (name: string) => {
    if (name.length === 0) return;

    setTags([...tags, name]);
  };

  const removeTag = (idx: number) => {
    if (!tags[idx]) return;

    const newTags = tags.filter((_, i) => idx !== i);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const tagNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  const tagNameClickHandler = () => {
    if (newTagName.length === 0) return;

    addTag(newTagName);
    setNewTagName("");
  };

  return (
    <Form title={title} onSubmit={submitHandler} isLoading={isLoading}>
      <FormInput
        label="Title"
        placeholder="Title"
        isError={Boolean(errors.title)}
        error={errors.title?.message || "Title required"}
        {...register("title", { required: true })}
      />

      <FormInput
        label="Short description"
        placeholder="Description"
        isError={Boolean(errors.description)}
        error={errors.description?.message || "Description required"}
        {...register("description", { required: true })}
      />

      <FormTextArea
        label="Text"
        placeholder="Text"
        isError={Boolean(errors.text)}
        error={errors.text?.message || "Text required"}
        {...register("text", { required: true })}
      />

      <TagsWrap>
        <FormLabel>Tags</FormLabel>
        <TagsList>
          {tags.map((tag, i) => {
            const key = `${tag}-${i}`;

            const deleteHandler = () => {
              removeTag(i);
            };

            let isError = false;
            if (errors.tags && errors.tags[i]) {
              isError = true;
            }

            return (
              <TagItem key={key}>
                <TagInner>
                  <TagInput
                    {...register(`tags.${i}`, { required: true })}
                    isError={isError}
                    defaultValue={tag}
                  />
                  <TagButton color="#F5222D" onClick={deleteHandler}>
                    Delete
                  </TagButton>
                </TagInner>
                {isError && <ErrorText>Required</ErrorText>}
              </TagItem>
            );
          })}
          <TagItem>
            <TagInner>
              <TagInput onChange={tagNameChangeHandler} value={newTagName} />
              <AddTagButton onClick={tagNameClickHandler}>Add tag</AddTagButton>
            </TagInner>
          </TagItem>
        </TagsList>
      </TagsWrap>

      <FormBottom>
        <StyledFormButton>{submitButtonText}</StyledFormButton>
        {isSuccess && <StyledAlert type="info" message={successMessage} />}
        {isError && <StyledAlert type="error" message={errorMessage} />}
      </FormBottom>
    </Form>
  );
};

export default ArticleForm;
