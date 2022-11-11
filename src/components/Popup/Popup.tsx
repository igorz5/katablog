import { FC } from "react";
import styled, { css } from "styled-components";

import dangerIcon from "../../assets/danger.svg";

const Wrapper = styled.div<{ show?: boolean }>`
  position: absolute;
  background-color: #fff;
  padding: 12px 16px;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
  display: none;

  ${(props) => (props.show ? "display: flex;" : "")}

  &:before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 6px 0;
    border-color: transparent #fff transparent transparent;
    left: -6px;
    top: 12px;
  }
`;

const Inner = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Icon = styled.img`
  margin-right: 9px;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #595959;
  margin-bottom: 0;
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  margin-left: auto;
`;

const Button = css`
  display: inline-block;
  padding: 0px 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  border-radius: 4px;
  border: 1px solid transparent;
  margin-right: 8px;
  transition: 0.15s;

  &:hover {
    transform: scale(0.9);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const DeclineButton = styled.button`
  ${Button}

  color: #595959;
  border-color: #d9d9d9;
`;

const AcceptButton = styled.button`
  ${Button}

  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
`;

export interface PopupProps {
  className?: string;
  text: string;
  show?: boolean;
  onAccept?: () => unknown | Promise<unknown>;
  onDecline?: () => unknown | Promise<unknown>;
}

const Popup: FC<PopupProps> = ({
  text,
  onAccept,
  onDecline,
  className,
  show = false,
}) => {
  return (
    <Wrapper className={className} show={show}>
      <Inner>
        <Icon src={dangerIcon} alt="Danger" />
        <Text>{text}</Text>
      </Inner>
      <Controls>
        <DeclineButton onClick={onDecline}>No</DeclineButton>
        <AcceptButton onClick={onAccept}>Yes</AcceptButton>
      </Controls>
    </Wrapper>
  );
};

export default Popup;
