import { Link } from "react-router-dom";

import styled, { css } from "styled-components";
import { useAuth } from "../../hooks/hooks";

import userImage from "../../assets/user.png";

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
    display: none;
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

const Button = css`
  display: inline-block;
  padding: 6px 18px 10px;
  border-radius: 5px;
  transition: 0.15s;

  &:hover,
  &:focus {
    transform: scale(0.9);
  }
`;

const SignInLink = styled(Link)`
  ${Button}

  color: rgba(0, 0, 0, 0.85);
  margin-right: 19px;

  &:hover {
    color: rgba(0, 0, 0, 0.85);
  }
`;

const SignUpLink = styled(Link)`
  ${Button}

  border: 1px solid #52c41a;
  color: #52c41a;

  &:hover {
    color: #52c41a;
  }
`;

const LogoutButton = styled.button`
  ${Button}

  border: 1px solid rgba(0, 0, 0, 0.75);
  color: rgba(0, 0, 0, 0.75);

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
  ${Button}

  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px 5px;
  margin-right: 37px;
  color: #52c41a;
  border: 1px solid #52c41a;

  &:hover {
    color: #52c41a;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileButtons = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;

    ${LogoutButton}, ${CreateArticleLink} {
      display: inline-block;
    }
  }
`;

const Header = () => {
  const { user, logout } = useAuth();

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
          <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
          <MobileButtons>
            <CreateArticleLink to="/new-article">
              Create article
            </CreateArticleLink>
            <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
          </MobileButtons>
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
        <SignInLink to="/sign-in">Sign In</SignInLink>
        <SignUpLink to="/sign-up">Sign Up</SignUpLink>
      </HeaderRight>
    </Wrapper>
  );
};

export default Header;
