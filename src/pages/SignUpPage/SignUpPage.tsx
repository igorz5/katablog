import { useId } from "react";
import { Alert } from "antd";
import { useForm, Validate } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { emailPattern } from "../../constants/patterns";
import Form from "../../components/UI/Form/Form";
import FormCheckbox from "../../components/UI/FormCheckbox/FormCheckbox";
import FormInput from "../../components/UI/FormInput/FormInput";
import { useRegisterUserMutation } from "../../services/BlogService";
import {
  extractError,
  isFetchBaseQueryError,
  isWrongDataError,
} from "../../services/helpers";
import FormButton from "../../components/UI/FormButton/FormButton";
import { useAuth } from "../../hooks/hooks";

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
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 21px;
  margin-bottom: 8px;
`;

const FormCheckboxWrap = styled.div`
  margin-bottom: 21px;
`;

const FormBottomText = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
  margin-bottom: 0;
`;

const FormLink = styled(Link)`
  color: #1890ff;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const CheckboxErrorText = styled.p`
  color: #f5222d;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 10px;
`;

const StyledAlert = styled(Alert)`
  margin-top: 12px;
`;

interface FormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  infocheck: boolean;
}

const formInputs = [
  {
    label: "Username",
    placeholder: "Username",
    id: "username",
    error: "must be 3 to 20 long",
    registerOptions: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
  },
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
  {
    label: "Repeat password",
    placeholder: "Password",
    id: "repeatPassword",
    error: "passwords must match",
    hide: true,
    registerOptions: {
      required: true,
      validate: (value: string | boolean, allValues: FormValues) => {
        const { password } = allValues;
        return password === value;
      },
    },
  },
];

const SignUpPage = () => {
  const { user } = useAuth();
  const inputId = useId();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [
    registerUser,
    { isSuccess: isRegisterSuccess, error: registerError, isLoading },
  ] = useRegisterUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data;
    const res = await registerUser({ username, email, password });

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
    }
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Form
        title="Create new account"
        isLoading={isLoading}
        onSubmit={onSubmit}
      >
        <FormInner>
          {formInputs.map((item) => {
            const key = item.id as keyof FormValues;
            const error = errors[key];
            const isError = Boolean(error);
            const options = item.registerOptions;

            let validate: Validate<string | boolean> | undefined;
            if (options.validate) {
              validate = (value) => {
                return options.validate(value, getValues());
              };
            }
            return (
              <FormInput
                label={item.label}
                id={`${item.id}-${inputId}`}
                key={item.id}
                placeholder={item.placeholder}
                type={item.hide ? "password" : "text"}
                isError={isError}
                error={error?.message || item.error}
                {...register(key, {
                  ...options,
                  validate,
                })}
              />
            );
          })}
        </FormInner>
        <FormCheckboxWrap>
          <FormCheckbox
            text="I agree to the processing of my personal information"
            isError={Boolean(errors.infocheck)}
            id="form-infocheck"
            {...register("infocheck", {
              required: true,
              validate: Boolean,
            })}
          />
        </FormCheckboxWrap>
        {Boolean(errors.infocheck) && (
          <CheckboxErrorText>
            You must agree for the processing of personal information
          </CheckboxErrorText>
        )}
        <FormButton>Create</FormButton>
        <FormBottomText>
          Already have an account?
          <FormLink to="/sign-in"> Sign In</FormLink>.
        </FormBottomText>

        {isFetchBaseQueryError(registerError) &&
          registerError.status !== 422 && (
            <StyledAlert type="error" message={extractError(registerError)} />
          )}

        {isRegisterSuccess && <Redirect to="/sign-in" />}
      </Form>
    </Wrapper>
  );
};

export default SignUpPage;
