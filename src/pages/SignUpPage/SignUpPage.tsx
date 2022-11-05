import { Alert } from "antd";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { emailPattern } from "../../components/constants/patterns";
import Form from "../../components/Form/Form";
import FormCheckbox from "../../components/FormCheckbox/FormCheckbox";
import FormInput from "../../components/FormInput/FormInput";
import { useRegisterUserMutation } from "../../services/BlogService";
import {
  extractError,
  isFetchBaseQueryError,
  isWrongDataError,
} from "../../services/helpers";

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

const SignUpPage = () => {
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

  return (
    <Wrapper>
      <Form
        title="Create new account"
        isLoading={isLoading}
        onSubmit={onSubmit}
      >
        <FormInner>
          <FormInput
            label="Username"
            id="form-username"
            placeholder="Username"
            isError={Boolean(errors.username)}
            error={errors.username?.message || "Must be in range of 3 to 20"}
            {...register("username", {
              required: true,
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
            {...register("email", { required: true, pattern: emailPattern })}
          />
          <FormInput
            label="Password"
            id="form-password"
            placeholder="Password"
            type="password"
            isError={Boolean(errors.password)}
            error={errors.password?.message || "Must be in range of 6 to 40"}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
          />
          <FormInput
            label="Repeat password"
            id="form-repeatpassword"
            placeholder="Password"
            type="password"
            isError={Boolean(errors.repeatPassword)}
            error="Passwords must match"
            {...register("repeatPassword", {
              required: true,
              validate: (value) => {
                const { password } = getValues();
                return password === value;
              },
            })}
          />
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
        <Button>Create</Button>
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
