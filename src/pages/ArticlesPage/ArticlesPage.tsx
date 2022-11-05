import { Alert, Pagination as AntdPagination, Spin } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import styled from "styled-components";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  useGetArticlesQuery,
  ARTICLES_PER_PAGE,
} from "../../services/BlogService";
import { extractError } from "../../services/helpers";
import { setPage } from "../../store/reducers/articlesSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListWrap = styled.div`
  margin-bottom: 26px;
  width: 100%;
`;

const Pagination = styled((props: PaginationProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AntdPagination {...props} />
))`
  .ant-pagination-item-active {
    background-color: #1890ff !important;
    border-radius: 4px;
    pointer-events: none;

    a {
      color: #fff !important;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 22px;
    }
  }

  .ant-pagination-item {
    margin-right: 8px !important;

    &:nth-last-child(2) {
      margin-right: 0 !important;
    }
  }

  .ant-pagination-prev {
    margin-right: 16px !important;
  }

  .ant-pagination-next {
    margin-left: 16px !important;
  }
`;

const ArticlesPage = () => {
  const currentPage = useAppSelector((state) => state.articles.currentPage);
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, error } = useGetArticlesQuery(currentPage);

  const handlePagination = (page: number) => {
    dispatch(setPage(page));
  };

  if (isError) {
    return (
      <Wrapper>
        <Alert type="error" message={extractError(error)} />
      </Wrapper>
    );
  }

  if (isLoading) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ListWrap>
        <ArticlesList articles={data?.articles}></ArticlesList>
      </ListWrap>
      <Pagination
        size="small"
        pageSize={ARTICLES_PER_PAGE}
        showSizeChanger={false}
        total={data?.articlesCount}
        current={currentPage}
        onChange={handlePagination}
      />
    </Wrapper>
  );
};

export default ArticlesPage;
