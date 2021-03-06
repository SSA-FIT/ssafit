import React from 'react';

import { Global } from '@emotion/react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import commonStyles from './styles/commonStyles';
import resetStyles from './styles/resetStyles';
import 'slick-carousel/slick/slick.css';

import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import ExerciseSelectionPage from './pages/ExerciseSelectionPage';
import LogInPage from './pages/LogInpage';
import history from './history';
import ProfilePage from './pages/ProfilePage';
import ExerciseHistoryPage from './pages/ExerciseHistoryPage';
import SearchIdPage from './pages/SearchIdPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ExerciseBookmarkPage from './pages/ExerciseBookmarkPage';
import { ErrorBoundary } from 'react-error-boundary';
import NonUserProfilePage from './pages/NonUserProfilePage';
import NewMainPage from './pages/NewMainPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ErrorPage from './pages/ErrorPages';

const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route exact path="/" component={MainPage} /> */}
          <Route exact path="/" component={NewMainPage} />
          <Route exact path="/users/sign-up" component={SignUpPage} />
          <Route exact path="/users/login" component={LogInPage} />
          <Route exact path="/users/profile" component={ProfilePage} />
          <Route exact path="/exercise" component={ExerciseSelectionPage} />
          <Route exact path="/nonuser" component={NonUserProfilePage} />
          <Route exact path="/users/search-id" component={SearchIdPage} />

          <Route
            exact
            path="/users/reset-password/verify"
            component={ResetPasswordPage}
          />
          <Route
            exact
            path="/exercise/history"
            component={ExerciseHistoryPage}
          />
          <Route
            exact
            path="/exercise/bookmark"
            component={ExerciseBookmarkPage}
          />
          <Route exact path="/privacy" component={PrivacyPage} />
          <Route
            exact
            path="/terms_of_service"
            component={TermsOfServicePage}
          />
          <Route component={ErrorPage} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
