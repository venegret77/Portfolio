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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


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
        this.state = { data: props.projects };
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
                </Card>
                
            </div>
        );
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
            if (this.state.user.login == null) window.location.pathname = '/';
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
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
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
                    {projects.map(projects =>
                            <div>
                            <Grid item xs={12}>
                                <MyProject projects={projects} isLinked={true} />
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                            </Grid>
                            </div>
                        )}
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