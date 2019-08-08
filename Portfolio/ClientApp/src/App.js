import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Project } from './components/Project';
import { Projects } from './components/Projects';
import { Login } from './components/account/Login';
import { Registration } from './components/account/Registration';
import { Logout } from './components/account/Logout';
import { Main } from './components/Main';

export default class App extends Component {
  displayName = App.name

    render() {
        return (
            <Layout>
                <Main />
            </Layout>
        );
    }
}
