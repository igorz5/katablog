import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 368px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 64px;
  font-weight: 700;
  line-height: 70px;
  color: #1890ff;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #1890ff;
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Title>Error 404</Title>
      <Subtitle>Looks like this page doesn't exist :c</Subtitle>
    </Wrapper>
  );
};

export default NotFoundPage;
