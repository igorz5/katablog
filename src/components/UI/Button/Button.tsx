import styled from "styled-components";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const Button = styled.button.attrs({ type: "button" })<ButtonProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.75);
  transition: 0.15s;

  ${({ size = "small" }) => {
    switch (size) {
      case "small":
        return "padding: 6px 10px;";
      case "medium":
        return "padding: 6px 17px;";
      case "large":
        return `
          font-size: 18px;
          line-height: 28px;
          padding: 8px 18px;
        `;
      default:
        return "";
    }
  }}

  ${({ color }) => {
    if (!color) return "";

    return `
      border-color: ${color};
      color: ${color};
    `;
  }}

  &:hover {
    transform: scale(0.9);
  }
`;

export default Button;
