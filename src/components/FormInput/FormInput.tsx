import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: #262626;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 2px;
`;

const Input = styled.input<{ isError?: boolean }>`
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid #d9d9d9;
  padding: 8px 12px;
  border-radius: 4px;

  ${({ isError }) => (isError ? "border-color: #f5222d;" : "")}
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
      <Label htmlFor={id}>{label}</Label>
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
