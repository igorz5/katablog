import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import ArticlesPage from "../../pages/ArticlesPage/ArticlesPage";
import ArticleViewPage from "../../pages/ArticleViewPage/ArticleViewPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import { useAppDispatch } from "../../hooks/hooks";
import { loadUser } from "../../services/helpers";
import { logout, setUser } from "../../store/reducers/authSlice";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";
import { useGetCurrentUserMutation } from "../../services/BlogService";
import PrivateRoute from "../router/PrivateRoute";
import CreateNewArticlePage from "../../pages/CreateNewArticlePage/CreateNewArticlePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import EditArticlePage from "../../pages/EditArticlePage/EditArticlePage";

const Container = styled.div`
  max-width: 938px;
  width: 90%;
  margin: 0 auto;
  padding-top: 26px;
  padding-bottom: 17px;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const [getCurrentUser] = useGetCurrentUserMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const loadSavedUser = async () => {
    const token = loadUser();

    if (!token) {
      dispatch(logout());
      setIsLoggingIn(false);
      return;
    }

    const res = await getCurrentUser({ token });
    if ("data" in res) {
      dispatch(setUser({ user: res.data.user }));
    }

    setIsLoggingIn(false);
  };

  useEffect(() => {
    loadSavedUser();
  }, []);

  if (isLoggingIn) return null;

  return (
    <Router>
      <Header isLoggingIn={isLoggingIn} />
      <main>
        <Container>
          <Switch>
            <Route path="/" component={ArticlesPage} exact />
            <Route path="/articles" component={ArticlesPage} exact />
            <Route path="/articles/:slug" component={ArticleViewPage} exact />
            <PrivateRoute
              path="/articles/:slug/edit"
              component={EditArticlePage}
            />
            <PrivateRoute
              path="/new-article"
              component={CreateNewArticlePage}
            />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/sign-in" component={SignInPage} />
            <PrivateRoute path="/profile" component={EditProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
};

export default App;
