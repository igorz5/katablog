import { format } from "date-fns";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import user from "../../assets/user.png";
import { IArticle } from "../../types/IArticle";
import FavoritesCount from "../FavoritesCount/FavoritesCount";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  @media screen and (max-width: 480px) {
    // flex-direction: column;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  margin-right: 6px;
`;

const Title = styled.h5`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #1890ff;
  margin-bottom: 4px;
  margin-right: 13px;
  word-break: break-all;
`;

const Link = styled(RouterLink)`
  &:hover {
    text-decoration: underline;
  }
`;

const TagList = styled.ul`
  display: flex;
  margin-bottom: 0;

  & > li {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Tag = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  padding: 2px 5px 3px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  border-radius: 2px;
`;

const Info = styled.div`
  display: flex;
`;

const InfoLeft = styled.div`
  margin-right: 12px;
  text-align: right;
`;

const UserName = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
`;

const UserImage = styled.img`
  width: 46px;
  height: 46px;
`;

const CreatedDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  margin-bottom: 0;
`;

export interface ArticlePreviewProps {
  data: IArticle;
}

const ArticlePreview: FC<ArticlePreviewProps> = ({ data }) => {
  return (
    <>
      <Header>
        <div>
          <TitleWrap>
            <Title>
              <Link to={`/articles/${data.slug}`}>{data.title}</Link>
            </Title>
            <FavoritesCount count={data.favoritesCount} />
          </TitleWrap>
          <TagList>
            {data.tagList.map((tag) => (
              <li key={tag}>
                <Tag>tag</Tag>
              </li>
            ))}
          </TagList>
        </div>
        <Info>
          <InfoLeft>
            <UserName>{data.author.username}</UserName>
            <CreatedDate>
              {format(new Date(data.createdAt), "MMMM dd, yyyy")}
            </CreatedDate>
          </InfoLeft>
          <UserImage src={data.author.image || user} alt="User image" />
        </Info>
      </Header>
      <Text>{data.description}</Text>
    </>
  );
};

export default ArticlePreview;
