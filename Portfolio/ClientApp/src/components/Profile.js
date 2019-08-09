import React from 'react';
import { Button } from 'react-bootstrap';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Button>Добро пожаловать!</Button>
            </div>
        )
    }
}