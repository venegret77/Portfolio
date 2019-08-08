import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import { Route } from 'react-router';
import { Registration } from './account/Registration';
import { Login } from './account/Login';
import { Logout } from './account/Logout';

import { Projects } from './Projects';
import { Project } from './Project';

import { Profile } from './Profile';

import { Home } from './Home';

export const Main = () => (
    <main>
        <Switch>
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />

            <Route path='/projects' component={Projects} />
            <Route path='/project' component={Project} />

            <Route path='/profile' component={Profile} />

            <Route exact path='/' component={Home} />
        </Switch>
    </main>
)