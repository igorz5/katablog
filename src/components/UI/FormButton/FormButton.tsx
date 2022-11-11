import styled from "styled-components";

const FormButton = styled.button.attrs({ type: "submit" })`
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

  &:hover {
    background-color: #1880ff;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default FormButton;
