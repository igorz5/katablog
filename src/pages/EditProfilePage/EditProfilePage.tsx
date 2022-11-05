import { Alert } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { Redirect } from "react-router";
import styled from "styled-components";
import { emailPattern, urlPattern } from "../../components/constants/patterns";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { useAppDispatch, useAuth } from "../../hooks/hooks";
import { useEditUserMutation } from "../../services/BlogService";
import {
  extractError,
  isFetchBaseQueryError,
  isWrongDataError,
  saveUser,
} from "../../services/helpers";
import { setUser } from "../../store/reducers/authSlice";

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

const Button = styled.button.attrs({ type: "submit" })`
  padding: 8px 16px;
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  background-color: #1890ff;
  border-radius: 4px;
  transition: 0.3s;
  margin-bottom: 8px;

  &:hover,
  &:focus {
    background-color: #1880ff;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const StyledAlert = styled(Alert)`
  margin-top: 12px;
`;

interface FormValues {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
}

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const values = useWatch({
    control,
  });

  const [editUser, { isSuccess: isEditSuccess, error: editError, isLoading }] =
    useEditUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    const { username, email, password, imageUrl } = data;
    const res = await editUser({
      username,
      email,
      password,
      imageUrl,
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

      if (errors.imageUrl) {
        setError("imageUrl", { message: errors.imageUrl });
      }
    }

    if ("data" in res && "user" in res.data) {
      const { user } = res.data;
      dispatch(setUser({ user }));

      saveUser(user);
    }
  });

  const renderSaveButton = () => {
    if (!user) return null;

    let disabled = true;
    console.log(values, user);

    if (
      values.password ||
      values.imageUrl ||
      values.email !== user.email ||
      values.username !== user.username
    ) {
      disabled = false;
    }

    return <Button disabled={disabled}>Save</Button>;
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Form title="Edit Profile" onSubmit={onSubmit} isLoading={isLoading}>
        <FormInner>
          <FormInput
            label="Username"
            id="form-username"
            placeholder="Username"
            isError={Boolean(errors.username)}
            error={errors.username?.message || "Must be in range of 3 to 20"}
            {...register("username", {
              minLength: 3,
              maxLength: 20,
            })}
          />
          <FormInput
            label="Email address"
            id="form-emailaddress"
            placeholder="Email address"
            isError={Boolean(errors.email)}
            error={errors.email?.message || "Must be correct email"}
            {...register("email", {
              pattern: emailPattern,
            })}
          />
          <FormInput
            label="Password"
            id="form-password"
            placeholder="Password"
            type="password"
            isError={Boolean(errors.password)}
            error={errors.password?.message || "Must be in range of 6 to 40"}
            {...register("password", {
              minLength: 6,
              maxLength: 40,
            })}
          />
          <FormInput
            label="Image (url)"
            id="form-image"
            placeholder="URL"
            isError={Boolean(errors.imageUrl)}
            error={errors.imageUrl?.message || "Must be correct url"}
            {...register("imageUrl", {
              pattern: urlPattern,
            })}
          />
        </FormInner>
        {renderSaveButton()}
        {isFetchBaseQueryError(editError) && editError.status !== 422 && (
          <StyledAlert type="error" message={extractError(editError)} />
        )}

        {isEditSuccess && <StyledAlert type="info" message="Success" />}
      </Form>
    </Wrapper>
  );
};

export default EditProfilePage;
