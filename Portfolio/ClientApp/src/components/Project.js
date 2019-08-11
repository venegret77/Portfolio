import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

export class Project extends Component {
    displayName = Project.name

    constructor(props) {
        super(props);
        this.state = { project: Object, photos: [] };
        let search = new URLSearchParams(this.props.location.search);
        let id = search.get("id");
        fetch("api/Project/GetProject?id=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ project: data.project, photos: data.projectPhotos });
                this.setState({ photos: data.projectPhotos });
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
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Grid item xs={12}>
                            <h1>{this.state.project.header}</h1>
                            
                        </Grid>
                        <Grid justify="center" item xs={12}>
                            {
                                this.state.edit &&
                                <p>
                                    <h1>Можно редактировать!</h1>
                                </p>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            overflow: 'hidden'
                        }}>
                            <GridList cellHeight={160} cols={3}>
                                {this.state.photos.map(photo => (
                                    <GridListTile key={photo.photoID}>
                                        <img src={photo.photoRef} alt={photo.photoName} />
                                        <GridListTileBar
                                            title={photo.photoName}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}