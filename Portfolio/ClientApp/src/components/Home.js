import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link, RouterLink } from 'react-router-dom';

export class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = { user: props.user, pcount: props.pcount };
    }
    render() {
        return (
            <Card>
                <Link to={`/projects/?id=${this.state.user.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={this.state.user.photoRef}
                        title={this.state.user.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            О себе: {this.state.user.description}
                            <br />
                            Навыки: {this.state.user.stack}
                            <br />
                            Email: {this.state.user.email}
                            <br />
                            Добавлено проектов: {this.state.pcount}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        );
    }
}

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
    }

    async loadData() {
        this.state = { usersprojects: [] };

        await fetch('api/Main/GetUsersProjects')
            .then(response => response.json())
            .then(data => {
                this.setState({ usersprojects: data });
            });
    }

    rendeUsersTable(usersprojects) {
        return <div>
            <Grid container spacing={5}>
                {usersprojects.map(usersprojects =>

                    <Grid item xs={4}>
                        <UserCard user={usersprojects.user} pcount={usersprojects.projectsCount} />
                    </Grid>
                )}
            </Grid>
        </div>
    }

    render() {
        return (
            this.rendeUsersTable(this.state.usersprojects)
        )
    }
}