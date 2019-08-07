import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Project } from './components/Project';
import { Projects } from './components/Projects';
import { Admin } from './components/Admin';
import { Login } from './components/account/Login';
import { Registration } from './components/account/Registration';
import { Logout } from './components/account/Logout';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
            <Route path='/registration' component={Registration} />
            <Route path='/projects' component={Projects} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/admin' component={Admin} />
            <Route path='/project' component={Project} />
            <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
