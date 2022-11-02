import { Link as RouterLink } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled.header`
  padding: 15px 22px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;

  @media screen and (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 24px;
    line-height: 32px;
  }
`;

const Link = styled(RouterLink)`
  transition: 0.3s;
  color: rgba(0, 0, 0, 0.85);

  &:hover {
    opacity: 0.8;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const Button = styled.button`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  padding: 6px 18px 10px;

  transition: 0.3s;
`;

const SignInButton = styled(Button)`
  color: rgba(0, 0, 0, 0.85);
  margin-right: 19px;
`;

const SignUpButton = styled(Button)`
  border: 1px solid #52c41a;
  color: #52c41a;
  border-radius: 5px;

  &:hover {
    background-color: #52c41a;
    color: #fff;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        <Link to="/">Realworld Blog</Link>
      </Logo>
      <div>
        <SignInButton>Sign In</SignInButton>
        <SignUpButton>Sign Up</SignUpButton>
      </div>
    </Wrapper>
  );
};

export default Header;
