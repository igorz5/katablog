import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";

import Header from "../Header/Header";

import ArticlesPage from "../../pages/ArticlesPage/ArticlesPage";
import ArticleViewPage from "../../pages/ArticleViewPage/ArticleViewPage";

const Container = styled.div`
  max-width: 938px;
  width: 90%;
  margin: 0 auto;
  padding-top: 26px;
  padding-bottom: 17px;
`;

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={ArticlesPage} exact />
          <Route path="/articles" component={ArticlesPage} exact />
          <Route path="/articles/:slug" component={ArticleViewPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
