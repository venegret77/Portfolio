import React, { Component } from 'react';
import { Layout } from './components/Layout';
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
