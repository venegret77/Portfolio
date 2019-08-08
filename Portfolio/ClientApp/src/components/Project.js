import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Project extends Component {
    displayName = Project.name

    constructor(props) {
        super(props);
        this.state = { project: Object, edit: false };
        let search = new URLSearchParams(this.props.location.search);
        let id = search.get("id");
        fetch("api/Project/GetProject?id=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ project: data });
            });
        fetch("api/Project/CheckEdit?id=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ edit: data });
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.edit &&
                    <p>
                        <h1>Можно редактировать!</h1>
                    </p>
                }
            </div>
        );
    }
}