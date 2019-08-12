import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export class Project extends Component {
    displayName = Project.name

    constructor(props) {
        super(props);
        this.state = { project: Object, photos: [], _photos: [], Header: "", Body: "", Stack: "", DateStart: "", DateEnd: "" };
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
        this.onHeaderChange = this.onHeaderChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onStackChange = this.onStackChange.bind(this);
        this.onDateStartChange = this.onDateStartChange.bind(this);
        this.onDateEndChange = this.onDateEndChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
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

    async onSubmit(e) {
        e.preventDefault();
        var photos = this.state._photos;
        var i = 0;
        for (i = 0; i < photos.length; i++) {
            let _formData = new FormData();
            _formData.append('Photo', photos[i]);
            await fetch("api/File",
                {
                    body: _formData,
                    method: "POST"
                });
        }
        let formData = new FormData();
        formData.append('id', this.state.project.id);
        formData.append('Header', this.state.Header);
        formData.append('Body', this.state.Body);
        formData.append('Stack', this.state.Stack);
        formData.append('DateStart', this.state.DateStart);
        formData.append('DateEnd', this.state.DateEnd);
        let response = await fetch("api/ChangeProject",
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
        this.setState({ _photos: photos });
        var i = 0;
        for (i = 0; i < photos.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(photos[i]);
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Grid justify="center" item xs={12}>
                            <Card>
                                <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align="center">
                                {this.state.project.header}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Описание: {this.state.project.body}
                                <br />
                                Стек технологий: {this.state.project.stack}
                                <br />
                                Дата: {"c: " + this.state.project.dateStart + " по: " + this.state.project.dateEnd}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid justify="center" item xs={12}>
                            <br/>
                        </Grid>
                        <Grid justify="center" item xs={12}>
                            {this.state.edit &&

                                <Grid item xs={12}>
                                    <form onSubmit={this.onSubmit}>
                                        <Card>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2" align="center">
                                                    Изменить текущий проект
                                        </Typography>
                                            </CardContent>
                                            <CardContent>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        
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
                                                        
                                                        id="standard-with-placeholder"
                                                        label="Стек технологи"
                                                        value={this.state.Stack}
                                                        onChange={this.onStackChange}
                                                        margin="normal" autoComplete="off"
                                                        style={{ minWidth: 300 }}
                                                    />
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            
                                                            id="standard-with-placeholder"
                                                            label="Описание"
                                                            value={this.state.Body}
                                                            onChange={this.onBodyChange}
                                                            margin="normal" autoComplete="off"
                                                            style={{ minWidth: 400 }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        
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
                                                    <br />
                                            </Grid>
                                            <Grid item xs={12}>

                                                <input
                                                    
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
                                                        Изменить
                                            </Button>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </form>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                            Фотографии проекта
                        </Typography>
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
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}