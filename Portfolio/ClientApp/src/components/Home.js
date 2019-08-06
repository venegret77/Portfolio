import React, { Component } from 'react';

export class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projects };
        this.onClick = this.onClick.bind(this);
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
            <p><button onClick={this.onClick}>Удалить</button></p>
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

/*class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", price: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onHeaderChange = this.onHeaderChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
    }
    onHeaderChange(e) {
        this.setState({ header: e.target.value });
    }
    onBodyChange(e) {
        this.setState({ body: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var phoneName = this.state.header;
        var phonePrice = this.state.body;
        this.props.onPhoneSubmit({ name: phoneName, price: phonePrice });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>

                <p>
                    <input type="text"
                        placeholder="Логин"
                        value={this.state.Login}
                        onChange={this.onHeaderChange} />
                </p>
                <p>
                    <input type="password"
                        placeholder="Пароль"
                        value={this.state.Password}
                        onChange={this.onBodyChange} />
                </p>

                <input type="submit" value="Войти" />
            </form>
        );
    }
}*/


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
        /*this.onAddProject = this.onAddProject.bind(this);
        this.onRemoveProject = this.onRemoveProject.bind(this);*/
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
    // добавление объекта
    /*onAddProject(e) {
        e.preventDefault();
        var login = this.state.Login;
        var pass = this.state.Password;
        let formData = new FormData();
        formData.append('Login', login);
        formData.append('Password', pass);
        this.state.error = false
        let response = await fetch("api/Main",
            {
                body: formData,
                method: "post"
            });
        if (!response.ok) {
            this.state.error = true;
            this.render();
        }
        this.setState({ Login: "", Password: "" });
    }
    // удаление объекта
    onRemoveProject(project) {

        if (project) {
            var url = this.props.apiUrl + "/" + project.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }*/
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
    static render12() {
        //var remove = this.onRemoveProject;
        return <div>
            {/*<ProjectForm onProjectSubmit={this.onAddProject} />*/}
            <h2>Список проектов</h2>
            <div>
                {
                    this.state.projects.map(function (project) {

                        return <Project key={project.id} project={project} /*onRemove={remove}*/ />
                    })
                }
            </div>
        </div>;
    }
}