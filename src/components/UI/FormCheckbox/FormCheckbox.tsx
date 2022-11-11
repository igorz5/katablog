import React, { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;

  & > input {
    display: none;
  }
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const Display = styled.div<{ isError?: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 5px;
  margin-right: 8px;
  border: 1px solid #d9d9d9;
  cursor: pointer;

  ${({ isError }) => (isError ? "border-color: #f5222d;" : "")}

  ${Label} > input:checked + & {
    background-color: #1890ff;
    border-color: #1890ff;

    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      transform: translate(-50%, -50%) rotate(45deg);
      top: 45%;
      left: 55%;
      height: 10px;
      width: 6px;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
    }
  }
`;

export interface FormCheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "type"> {
  text?: string;
  isError?: boolean;
  error?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  (props, ref) => {
    const { text, isError, ...restProps } = props;
    return (
      <Label>
        <input {...restProps} ref={ref} type="checkbox" />
        <Display isError={isError} />
        <Text>{text}</Text>
      </Label>
    );
  }
);

export default FormCheckbox;
