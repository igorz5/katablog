import { FC } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useAuth } from "../../hooks/hooks";

import userImage from "../../assets/user.jpg";
import { clearUser } from "../../services/helpers";
import Button from "../UI/Button/Button";

const Wrapper = styled.header`
  position: relative;
  padding: 15px 22px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;

  @media screen and (max-width: 768px) {
    padding-top: 30px;
    flex-direction: column;
  }
`;

const Logo = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 10px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SignInLink = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  margin-right: 19px;
  transition: 0.15s;
`;

const SignUpLink = styled(Link)`
  display: inline-block;
  padding: 6px 18px 10px;
  border-radius: 5px;
  transition: 0.15s;
  border: 1px solid #52c41a;
  color: #52c41a;

  &:hover {
    transform: scale(0.9);
    color: #52c41a;
  }
`;

const LogoutButton = styled(Button).attrs({
  size: "large",
  color: "rgba(0, 0, 0, 0.75)",
})`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  margin-right: 27px;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-bottom: 12px;
    margin-right: 0;
  }
`;

const UserName = styled.div`
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.85);
  margin-right: 13px;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 46px;
  height: 46px;

  @media screen and (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`;

const CreateArticleLink = styled(Link)`
  display: inline-block;
  border-radius: 5px;
  transition: 0.15s;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px 5px;
  margin-right: 37px;
  color: #52c41a;
  border: 1px solid #52c41a;

  &:hover {
    transform: scale(0.9);
    color: #52c41a;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileControls = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;

    ${LogoutButton}, ${CreateArticleLink} {
      display: inline-block;
    }
  }
`;

export interface HeaderProps {
  isLoggingIn?: boolean;
}

const Header: FC<HeaderProps> = ({ isLoggingIn }) => {
  const { user, logout } = useAuth();

  const onLogout = () => {
    clearUser();

    logout();
  };

  if (user) {
    return (
      <Wrapper>
        <Logo>
          <Link to="/">Realworld Blog</Link>
        </Logo>
        <HeaderRight>
          <CreateArticleLink to="/new-article">
            Create article
          </CreateArticleLink>
          <UserInfo>
            <UserName>
              <Link to="/profile">{user.username}</Link>
            </UserName>
            <UserImage src={user.image || userImage} alt="User profile image" />
          </UserInfo>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          <MobileControls>
            <CreateArticleLink to="/new-article">
              Create article
            </CreateArticleLink>
            <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
          </MobileControls>
        </HeaderRight>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Realworld Blog</Link>
      </Logo>
      <HeaderRight>
        {!isLoggingIn && (
          <>
            <SignInLink to="/sign-in">Sign In</SignInLink>
            <SignUpLink to="/sign-up">Sign Up</SignUpLink>
          </>
        )}
      </HeaderRight>
    </Wrapper>
  );
};

export default Header;
