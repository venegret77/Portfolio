import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projectphotos };
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden'
            }}>
                <GridList style={{
                    flexWrap: 'nowrap',
                    transform: 'translateZ(0)'
                }} cols={2.5}>
                    {this.state.data.map(photo => (
                        <GridListTile key={photo.photoID}>
                            <img src={photo.photoRef} alt={photo.photoName} />
                            <GridListTileBar
                                title={photo.photoName}
                                style={{
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export class MyProject extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.projects, isEdit: props.isEdit };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('id', this.state.data.project.id);
        let response = await fetch("api/Project",
            {
                body: formData,
                method: "POST"
            });
        if (response.ok) {
            window.location.reload();
        }
        else {
            window.location.replace("/");
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>
                                P
                        </Avatar>
                        }
                        action={
                            <Link to={`/project/?id=${this.state.data.project.id}`}>
                            <IconButton aria-label="menu">
                                <MenuIcon />
                                </IconButton>
                                </Link>
                        }
                        title={this.state.data.project.header}
                        subheader={"c: " + this.state.data.project.dateStart + " по: " + this.state.data.project.dateEnd}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Описание проекта: {this.state.data.project.body}
                            <br />
                            Стек технологий: {this.state.data.project.stack}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Photos projectphotos={this.state.data.projectPhotos} />
                    </CardContent>
                    <CardContent align="right">
                        {this.state.isEdit &&
                            <form onSubmit={this.onSubmit} >
                                <Button type="submit" align="center"> Удалить проект </Button>
                            </form>
                        }
                        <Link to={`/project/?id=${this.state.data.project.id}`}><Button align="center"> Открыть проект </Button></Link>
                    </CardContent>
                </Card>
                
            </div>
        );
    }
}

export class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = { projects: [], user: Object, isEdit: false, photos: [], photosref: [], Header: "", Body: "", Stack: "", DateStart: "", DateEnd: "" };
        this.loadData();
        this._handleImageChange = this._handleImageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onHeaderChange = this.onHeaderChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onStackChange = this.onStackChange.bind(this);
        this.onDateStartChange = this.onDateStartChange.bind(this);
        this.onDateEndChange = this.onDateEndChange.bind(this);
    }

    onHeaderChange(e) {
        this.setState({ Header: e.target.value });
    }
    onBodyChange(e) {
        this.setState({ Body: e.target.value });
    }
    onStackChange(e) {
        this.setState({ Stack: e.target.value });
    }
    onDateStartChange(e) {
        this.setState({ DateStart: e.target.value });
    }
    onDateEndChange(e) {
        this.setState({ DateEnd: e.target.value });
    }

    // Загрузка
    async loadData() {
        
        let search = new URLSearchParams(this.props.location.search);
        let id = search.get("id");
        if (id == null) {
            await fetch('api/Main/GetMyUser')
                .then(response => response.json())
                .then(data => {
                    this.setState({ user: data });
                });
            if (this.state.user.login == null) window.location.pathname = '/';
            fetch('api/Main/GetProjects?uid=' + this.state.user.id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ projects: data });
                });
            this.setState({ isEdit: true });
        }
        else {
            await fetch('api/Main/GetMyUser')
                .then(response => response.json())
                .then(data => {
                    this.setState({ user: data });
                });
            if (this.state.user.id == id) this.setState({ isEdit: true });
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

    async onSubmit(e) {
        e.preventDefault();
        var photos = this.state.photos;
        var i = 0;
        for (i = 0; i < photos.length; i++)
        {
            let _formData = new FormData();
            _formData.append('Photo', photos[i]);
            await fetch("api/File",
                {
                    body: _formData,
                    method: "POST"
                });
        }
        let formData = new FormData();
        formData.append('id', "");
        formData.append('Header', this.state.Header);
        formData.append('Body', this.state.Body);
        formData.append('Stack', this.state.Stack);
        formData.append('DateStart', this.state.DateStart);
        formData.append('DateEnd', this.state.DateEnd);
        let response = await fetch("api/Main",
            {
                body: formData,
                method: "POST"
            });
        if (response.ok) {
            window.location.reload();
        }
        else {
            window.location.replace("/");
        }
    }

    async _handleImageChange(e) {
        e.preventDefault();
        let photos = e.target.files;
        this.setState({ photos: photos });
        var i = 0;
        for (i = 0; i < photos.length; i++)
        {
            let reader = new FileReader();
            reader.readAsDataURL(photos[i]);
        }
    }

    rendeProjectsTable(projects, user) {
        return <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={user.photoRef}
                                    title={user.name}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid justify="center" item xs={12}>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            О себе: {user.description}
                            <br />
                            Навыки: {user.stack}
                            <br />
                            Email: {user.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    {this.state.isEdit &&

                        <Grid item xs={12}>
                            <form onSubmit={this.onSubmit}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            Добавить новый проект
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Grid item xs={5}>
                                        <TextField
                                            required
                                            id="standard-with-placeholder"
                                            label="Заголовок"
                                            value={this.state.Header}
                                            onChange={this.onHeaderChange}
                                            margin="normal" autoComplete="off"
                                            style={{ minWidth: 300 }}
                                        />
                                        </Grid>
                                        <Grid item xs={5}>
                                        <TextField
                                            required
                                            id="standard-with-placeholder"
                                            label="Стек технологи"
                                            value={this.state.Stack}
                                            onChange={this.onStackChange}
                                            margin="normal" autoComplete="off"
                                            style={{ minWidth: 300 }}
                                        />
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="standard-with-placeholder"
                                                label="Описание"
                                                value={this.state.Body}
                                                onChange={this.onBodyChange}
                                                margin="normal" autoComplete="off"
                                                style={{ minWidth: 800 }}
                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid item xs={5}>
                                        <TextField
                                            required
                                            id="standard-with-placeholder"
                                            label="Дата начала"
                                            value={this.state.DateStart}
                                            onChange={this.onDateStartChange}
                                            margin="normal" autoComplete="off"
                                            style={{ minWidth: 300 }}
                                            type="date"
                                        />
                                        </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            required
                                            id="standard-with-placeholder"
                                            label="Дата окончания"
                                            value={this.state.DateEnd}
                                            onChange={this.onDateEndChange}
                                            margin="normal" autoComplete="off"
                                            style={{ minWidth: 300 }}
                                            type="date"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                            <input
                                                required
                                                type="file"
                                            multiple
                                                id="standard-with-placeholder"
                                                label="Выберите файл"
                                                onChange={(e) => this._handleImageChange(e)}
                                            />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <br />
                                    </Grid>
                                    <Grid item xs={12} alignContent="right" alignItems="right" align="right">
                                        <Button type="submit" variant="contained" color="primary" align="right" alignItems="center">
                                            Добавить
                                            </Button>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </form>
                        </Grid>
                    }
                    {
                    projects.map(project =>
                        <div>
                            <Grid item xs={12}>
                                <br />
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            Проекты за {project.year} год
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <br />
                            </Grid>
                            {
                                project.projects.map(_project =>
                                <div>
                                        <Grid item xs={12}>
                                            <MyProject projects={_project} isEdit={this.state.isEdit} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <br />
                                    </Grid>
                                </div>
                                )
                            }
                            
                        </div>
                        )
                    }
                </Grid>
            </Grid>

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