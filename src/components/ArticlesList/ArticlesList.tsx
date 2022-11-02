import { FC } from "react";

import styled from "styled-components";
import { IArticle } from "../../types/IArticle";
import ArticleItem from "../ArticleItem/ArticleItem";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-stretch;
  margin-bottom: 0;

  & > li {
    width: 100%;
    margin-bottom: 26px;

    &:last-child {
      margin-bottom: 0;
    }
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
          <li key={item.slug}>
            <ArticleItem data={item} />
          </li>
        ))}
    </Wrapper>
  );
};

export default ArticlesList;
