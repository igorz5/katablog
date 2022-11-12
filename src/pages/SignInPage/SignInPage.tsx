import { useId } from "react";
import { Alert } from "antd";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { emailPattern } from "../../constants/patterns";
import Form from "../../components/UI/Form/Form";
import FormInput from "../../components/UI/FormInput/FormInput";
import { useAppDispatch, useAuth } from "../../hooks/hooks";
import { useLoginUserMutation } from "../../services/BlogService";
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

const FormBottomText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
`;

const FormLink = styled(Link)`
  color: #1890ff;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const StyledAlert = styled(Alert)`
  margin-top: 12px;
`;

interface FormValues {
  email: string;
  password: string;
}

const formInputs = [
  {
    label: "Email",
    placeholder: "Email",
    id: "email",
    error: "must be correct email",
    registerOptions: {
      required: true,
      pattern: emailPattern,
    },
  },
  {
    label: "Password",
    placeholder: "Password",
    id: "password",
    error: "must be of 6 to 40 long",
    hide: true,
    registerOptions: {
      required: true,
      minLength: 6,
      maxLength: 40,
    },
  },
];

const SignInPage = () => {
  const { user } = useAuth();
  const inputId = useId();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [
    loginUser,
    { isSuccess: isLoginSuccess, error: loginError, isLoading },
  ] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const res = await loginUser({ email, password });

    if (isWrongDataError(res)) {
      const { errors } = res.error.data;

      if (errors.email) {
        setError("email", { message: errors.email });
      }

      if (errors.password) {
        setError("password", { message: errors.password });
      }

      if (errors["email or password"]) {
        const msg = `email or password ${errors["email or password"]}`;
        setError("email", { message: msg });
        setError("password", { message: msg });
      }
    }

    if ("data" in res && "user" in res.data) {
      const { user } = res.data;
      dispatch(setUser({ user }));

      saveUser(user);
    }
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Form title="Sign In" onSubmit={onSubmit} isLoading={isLoading}>
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
        <FormButton>Login</FormButton>
        <FormBottomText>
          Don’t have an account?
          <FormLink to="/sign-in"> Sign Up</FormLink>.
        </FormBottomText>
        {isFetchBaseQueryError(loginError) && loginError.status !== 422 && (
          <StyledAlert type="error" message={extractError(loginError)} />
        )}

        {isLoginSuccess && <Redirect to="/" />}
      </Form>
    </Wrapper>
  );
};

export default SignInPage;
