import { Spin } from "antd";
import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #262626;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  title: string;
  isLoading?: boolean;
}

const Form: FC<FormProps> = ({ title, children, isLoading, ...restProps }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <StyledForm {...restProps}>
          <Inner>{children}</Inner>
        </StyledForm>
      )}
    </Wrapper>
  );
};

export default Form;
