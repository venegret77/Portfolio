import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorSharp } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Standard license
                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Full resolution 1920x1080 • JPEG
                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: 1030114
                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { Login: "", Password: "", error: false };
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    onLoginChange(e) {
        this.setState({ Login: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ Password: e.target.value });
    }
    async onSubmit(e) {
        e.preventDefault();
        var login = this.state.Login;
        var pass = this.state.Password;
        if (!login || pass <= 0) {
            return;
        }
        let formData = new FormData();
        formData.append('Login', login);
        formData.append('Password', pass);
        this.state.error = false
        let response = await fetch("api/Login",
            {
                body: formData,
                method: "POST",
                credentials: 'include'
            });
        if (!response.ok) {
            this.state.error = true;
            this.render();
        }
        else {
            window.location.replace("/");
        }
        this.setState({ Login: "", Password: "" });
    }
    render() {

        return (
            <Grid justify="center" container spacing={2}>
                <ComplexGrid/>
                <form onSubmit={this.onSubmit} style={{
                    alignContent: 'center'
                }} noValidate autoComplete="off">
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="standard-with-placeholder"
                            label="Имя пользователя"
                            value={this.state.Login}
                            onChange={this.onLoginChange}
                            margin="normal"
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="standard-password-input"
                            label="Пароль"
                            value={this.state.Password}
                            type="password"
                            autoComplete="new-password"
                            margin="normal"
                            onChange={this.onPasswordChange}
                            readonly
                            onfocus="this.removeAttribute('readonly')"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        {this.state.error ? (
                            [
                                <Button type="submit" variant="contained" color="inherit">
                                    Войти
                            </Button>,
                                <ErrorSharp size={24} color="error" />
                            ]
                        ) : (
                                [
                                    <Button type="submit" variant="contained" color="primary">
                                        Войти
                                </Button>
                                ]

                            )
                        }
                    </Grid>
                </form>
            </Grid>
        );
    }
}