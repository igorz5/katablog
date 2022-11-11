import { FC } from "react";

import styled from "styled-components";
import { IArticle } from "../../types/IArticle";
import ArticleItem from "../ArticleItem/ArticleItem";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-stretch;
  margin-bottom: 0;
`;

const Item = styled.li`
  width: 100%;
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export interface ArticlesListProps {
  articles?: IArticle[];
}

const ArticlesList: FC<ArticlesListProps> = ({ articles }) => {
  return (
    <Wrapper>
      {articles &&
        articles.map((item) => (
          <Item key={item.slug}>
            <ArticleItem data={item} />
          </Item>
        ))}
    </Wrapper>
  );
};

export default ArticlesList;
