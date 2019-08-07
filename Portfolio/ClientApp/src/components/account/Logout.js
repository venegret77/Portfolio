import React, { Component } from 'react'

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout();
    }
    async logout() {
        await fetch("api/Login/Logout");
        window.location.replace("/");
    }
    render() {
        return (
            <div>
            </div>
        );

    }
}