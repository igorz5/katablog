import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import FormLabel from "../FormLabel/FormLabel";
import TextArea from "../TextArea/TextArea";

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

export interface FormTextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isError?: boolean;
  error?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (props, ref) => {
    const { id, label, isError, error, ...restProps } = props;
    return (
      <Wrapper>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <TextArea isError={isError} id={id} ref={ref} {...restProps}></TextArea>

        {isError && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

export default FormTextArea;
