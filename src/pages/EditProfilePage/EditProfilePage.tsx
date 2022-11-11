import { useId } from "react";
import { Alert } from "antd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { emailPattern, urlPattern } from "../../constants/patterns";
import Form from "../../components/UI/Form/Form";
import FormInput from "../../components/UI/FormInput/FormInput";
import { useAppDispatch, useAuth } from "../../hooks/hooks";
import { useEditUserMutation } from "../../services/BlogService";
import {
  extractError,
  isFetchBaseQueryError,
  isWrongDataError,
  saveUser,
} from "../../services/helpers";
import { setUser } from "../../store/reducers/authSlice";
import FormButton from "../../components/UI/FormButton/FormButton";

const Wrapper = styled.div`
  padding: 48px 32px;
  max-width: 384px;
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

const FormInner = styled.div`
  width: 100%;
  margin-bottom: 21px;
`;

const StyledAlert = styled(Alert)`
  margin-top: 12px;
`;

interface FormValues {
  username: string;
  email: string;
  password: string;
  image: string;
}

const formInputs = [
  {
    label: "Username",
    placeholder: "Username",
    id: "username",
    error: "Must be in range of 3 to 20",
    registerOptions: {
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    label: "Email",
    placeholder: "Email",
    id: "email",
    error: "Must be correct email",
    registerOptions: {
      pattern: emailPattern,
    },
  },
  {
    label: "Password",
    placeholder: "Password",
    id: "password",
    error: "Must be in range of 6 to 40",
    hide: true,
    registerOptions: {
      minLength: 6,
      maxLength: 40,
    },
  },
  {
    label: "Image (url)",
    placeholder: "URL",
    id: "image",
    error: "Must be correct URL",
    registerOptions: {
      pattern: urlPattern,
    },
  },
];

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const inputId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const [editUser, { isSuccess: isEditSuccess, error: editError, isLoading }] =
    useEditUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    const { username, email, password, image } = data;
    const res = await editUser({
      username,
      email,
      password,
      image,
      token: user.token,
    });

    if (isWrongDataError(res)) {
      const { errors } = res.error.data;

      if (errors.username) {
        setError("username", { message: errors.username });
      }

      if (errors.email) {
        setError("email", { message: errors.email });
      }

      if (errors.password) {
        setError("password", { message: errors.password });
      }

      if (errors.image) {
        setError("image", { message: errors.image });
      }
    }

    if ("data" in res && "user" in res.data) {
      const { user } = res.data;
      dispatch(setUser({ user }));

      saveUser(user);
    }
  });

  return (
    <Wrapper>
      <Form title="Edit Profile" onSubmit={onSubmit} isLoading={isLoading}>
        <FormInner>
          {formInputs.map((item) => {
            const key = item.id as keyof FormValues;
            const error = errors[key];
            const isError = Boolean(error);
            const options = item.registerOptions;

            return (
              <FormInput
                label={item.label}
                id={`${item.id}-${inputId}`}
                key={item.id}
                type={item.hide ? "password" : "text"}
                placeholder={item.placeholder}
                isError={isError}
                error={error?.message || item.error}
                {...register(key, options)}
              />
            );
          })}
        </FormInner>
        <FormButton>Save</FormButton>
        {isFetchBaseQueryError(editError) && editError.status !== 422 && (
          <StyledAlert type="error" message={extractError(editError)} />
        )}

        {isEditSuccess && <StyledAlert type="info" message="Success" />}
      </Form>
    </Wrapper>
  );
};

export default EditProfilePage;
