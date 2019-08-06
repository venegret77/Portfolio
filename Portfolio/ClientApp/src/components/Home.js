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
    // загрузка данных
    loadData() {
        this.state = { projects: [], loading: true };
        fetch('api/Main/GetProjects')
            .then(response => response.json())
            .then(data => {
                this.setState({ projects: data, loading: false  });
            });
        var test = "";
    }

    renderForecastsTable(projects) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Заголовок</th>
                        <th>Дальше</th>
                        <th>ЕЩЕ</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project =>
                        <tr key={project.project.id}>
                            <td>{project.project.id}</td>
                            <td>{project.project.header}</td>
                            <td>{project.project.body}</td>
                            <td>{project.project.stack}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    rendeProjectsTable(projects) {
        return <div>
            {projects.map(projects =>
                <Project projects={projects} />
            )}
        </div>
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.rendeProjectsTable(this.state.projects);

        return (
            <div>
                <h1>Список проектов:</h1>
                {contents}
            </div>
        );
    }
}