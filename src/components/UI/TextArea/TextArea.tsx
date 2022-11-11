import styled from "styled-components";

const TextArea = styled.textarea<{ isError?: boolean }>`
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid #d9d9d9;
  padding: 8px 12px;
  border-radius: 4px;
  resize: vertical;
  min-height: 168px;

  &:focus {
    border-color: #1890ff;
  }

  ${({ isError }) => (isError ? "border-color: #f5222d;" : "")}
`;

export default TextArea;
