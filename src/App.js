import React, { useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';
import Logout from './components/Logout/Logout';

import { autoLogin } from './store/actions/auth';

const App = ({autoLogin, isAuthenticated}) => {

  useEffect(() => {
    autoLogin()
  }, [autoLogin]);


  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' exact component={QuizList} />
      <Redirect to='/' />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
