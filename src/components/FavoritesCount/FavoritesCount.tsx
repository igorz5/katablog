import { FC } from "react";
import styled from "styled-components";

import heart from "../../assets/heart.svg";
import heartFull from "../../assets/heart_full.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Count = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
`;

const Button = styled.button<{ active?: boolean }>`
  position: relative;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  transition: 0.3s;
  width: 14px;
  height: 14px;
  background: url(${heart}) no-repeat center / 100%;
  margin-right: 5px;

  &::after {
    display: none;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(${heartFull}) no-repeat center / 100%;
  }

  ${(props) =>
    props.active &&
    `
      background: none;
      &::after {
        display: block;
      }
    `}
`;

export interface FavoritesCountProps {
  count?: number;
  active?: boolean;
  disabled?: boolean;
  onFavorite?: () => unknown | Promise<unknown>;
}

const FavoritesCount: FC<FavoritesCountProps> = ({
  count = 0,
  active,
  disabled,
  onFavorite,
}) => {
  const onClick = () => {
    if (!onFavorite) return;

    onFavorite();
  };
  return (
    <Wrapper>
      <Button active={active} disabled={disabled} onClick={onClick} />
      <Count>{count}</Count>
    </Wrapper>
  );
};

export default FavoritesCount;
