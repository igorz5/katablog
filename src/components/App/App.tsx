import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import { useEffect } from "react";

import Header from "../Header/Header";
import ArticlesPage from "../../pages/ArticlesPage/ArticlesPage";
import ArticleViewPage from "../../pages/ArticleViewPage/ArticleViewPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import { useAppDispatch } from "../../hooks/hooks";
import { loadUser } from "../../services/helpers";
import { setUser } from "../../store/reducers/authSlice";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";

const Container = styled.div`
  max-width: 938px;
  width: 90%;
  margin: 0 auto;
  padding-top: 26px;
  padding-bottom: 17px;
`;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = loadUser();
    if (!user) return;

    dispatch(setUser({ user }));
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={ArticlesPage} exact />
          <Route path="/articles" component={ArticlesPage} exact />
          <Route path="/articles/:slug" component={ArticleViewPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/profile" component={EditProfilePage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
