import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Button to="/login" variant="contained" color="primary">
                    Hello World
                </Button>
                <h1>Добро пожаловать!</h1>
            </div>
        )
    }
}