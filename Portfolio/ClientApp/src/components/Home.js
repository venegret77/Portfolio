import React, { Component } from 'react';

export class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projects };
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
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

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
    }
    // Загрузка
    async loadData() {
        this.state = { projects: [], user: Object };
        this.state.user = "unkown user";
        await fetch('api/Main/GetUser')
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data });
            });
        if (this.state.user.login == null) window.location.replace("/login");
        fetch('api/Main/GetProjects')
            .then(response => response.json())
            .then(data => {
                this.setState({ projects: data });
            });
    }

    rendeProjectsTable(projects, user) {
        return <div>
            <h1>Проекты пользователя {user.name}</h1>
            <h1>Список проектов:</h1>
            {projects.map(projects =>
                <Project projects={projects} />
            )}
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