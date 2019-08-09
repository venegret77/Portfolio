import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MyProject extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projects, isLinked: props.isLinked };
    }
    render() {
        return <div>
            {
                this.state.isLinked &&
                <li key={this.state.data.project.id}>
                    <Link to={`/project/?id=${this.state.data.project.id}`}>{this.state.data.project.header}</Link>
                </li>
            }
            
            <p><b>{this.state.data.project.id}</b></p>
            <p><b>{this.state.data.project.header}</b></p>
            <p><b>{this.state.data.project.body}</b></p>
            <p><b>{this.state.data.project.dateStart}</b></p>
            <p><b>{this.state.data.project.dateEnd}</b></p>
            <p><Photos projectphotos={this.state.data.projectPhotos} /></p>
        </div>;
    }
}

export class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projectphotos };
    }
    render() {
        return <div>
            {
                this.state.data.map(data =>
                    <div>
                        <p><img src={data.photoRef}></img></p>
                        <p>{data.photoName}</p>
                    </div>
                )}
        </div>
    }
}

export class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
    }
    // Загрузка
    async loadData() {
    this.state = { projects: [], user: Object };        
    let search = new URLSearchParams(this.props.location.search);
    let id = search.get("id");
        if (id == null) {
            await fetch('api/Main/GetMyUser')
                .then(response => response.json())
                .then(data => {
                    this.setState({ user: data });
                });
            if (this.state.user.login == null) window.location.pathname  = '/';
            fetch('api/Main/GetMyProjects')
                .then(response => response.json())
                .then(data => {
                    this.setState({ projects: data });
                });
        }
        else {
            await fetch('api/Main/GetUser?uid=' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ user: data });
                });
            fetch('api/Main/GetProjects?uid=' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ projects: data });
                });
        }
    }

    rendeProjectsTable(projects, user) {
        return <div>
            <h1>Проекты пользователя {user.name}</h1>
            <h1>Список проектов:</h1>
            <ul>
                {projects.map(projects =>
                    <MyProject projects={projects} isLinked={true} />
                )}
            </ul>
        </div>
    }

    render() {
        return (
            <div>
                {this.rendeProjectsTable(this.state.projects, this.state.user)}
            </div>
        );
    }
}