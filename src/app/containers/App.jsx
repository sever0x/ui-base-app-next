import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import SecretPage from 'pageProviders/Secret';
import SongPage from 'pageProviders/Song';
import CreatePage from 'pageProviders/Create';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';

import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';
import ProtectedRoute from "../../pageProviders/components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
            {state.componentDidMount && (
              <IntlProvider>
                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                {isFetchingUser && (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                )}
                {!isFetchingUser && (
                    <Routes>
                      <Route
                          path={pageURLs[pages.defaultPage]}
                          element={<ProtectedRoute element={<DefaultPage />} />}
                      />
                      <Route
                          path={pageURLs[pages.secretPage]}
                          element={<ProtectedRoute element={<SecretPage />} />}
                      />
                      <Route
                          path={`${pageURLs[pages.songPage]}/:songId`}
                          element={<ProtectedRoute element={<SongPage />} />}
                      />
                      <Route
                          path={`${pageURLs[pages.songPage]}/create`}
                          element={<ProtectedRoute element={<CreatePage />} />}
                      />
                      <Route
                          path={pageURLs[pages.login]}
                          element={
                            <LoginPage
                                errors={errors}
                                isFailedSignIn={isFailedSignIn}
                                isFailedSignUp={isFailedSignUp}
                                isFetchingSignIn={isFetchingSignIn}
                                isFetchingSignUp={isFetchingSignUp}
                                onGoogleSignIn={() => dispatch(actionsUser.fetchGoogleSignIn())}
                                onSignUp={({ email, firstName, lastName, login, password }) =>
                                    dispatch(
                                        actionsUser.fetchSignUp({
                                          email,
                                          firstName,
                                          lastName,
                                          login,
                                          password,
                                        })
                                    )
                                }
                            />
                          }
                      />
                      <Route
                          path="*"
                          element={<MissedPage redirectPage={pageURLs[pages.defaultPage]} />}
                      />
                    </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
