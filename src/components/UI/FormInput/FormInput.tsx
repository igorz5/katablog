import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import FormLabel from "../FormLabel/FormLabel";
import Input from "../Input/Input";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorText = styled.p`
  color: #f5222d;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 0;
`;

export interface FormInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  type?: "text" | "password";
  isError?: boolean;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { id, type, label, isError, error, ...restProps } = props;
  return (
    <Wrapper>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        isError={isError}
        id={id}
        type={type || "text"}
        {...restProps}
        ref={ref}
      />
      {isError && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
});

export default FormInput;
