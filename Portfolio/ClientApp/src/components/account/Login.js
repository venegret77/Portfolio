import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ErrorSharp } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

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
            <Grid justify="center" alignItems="center" container spacing={2}>
                <form onSubmit={this.onSubmit} style={{
                    alignContent: 'center'
                }} noValidate autoComplete="off">
                    {this.state.error ? (
                        [
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    error
                                    id="standard-with-placeholder"
                                    label="Имя пользователя"
                                    value={this.state.Login}
                                    onChange={this.onLoginChange}
                                    margin="normal"
                                    autoComplete="off"
                                />
                            </Grid>,
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    error
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
                        ]
                    ) : (
                            [
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
                                </Grid>,
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
                            ]

                        )
                    }
                    <Grid item xs={12} >
                        {this.state.error ? (
                            [
                                <Button type="submit" variant="contained" color="primary">
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