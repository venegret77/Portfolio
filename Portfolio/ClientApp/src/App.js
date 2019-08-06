import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Project } from './components/Project';
import { Admin } from './components/Admin';
import { Login } from './components/account/Login';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/project' component={Project} />
            <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
