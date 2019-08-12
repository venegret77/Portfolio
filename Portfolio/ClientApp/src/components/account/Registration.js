import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ErrorSharp } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Avatar from '@material-ui/core/Avatar';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Login: "",
            isLoginUncorrect: false,
            Password: "",
            ConfPassword: "",
            isConfPassUncorrect: false,
            Email: "",
            Description: "",
            Stack: "",
            Name: "",
            file: '',
            imagePreviewUrl: '',
            error: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfimChange = this.onPasswordConfimChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onStackChange = this.onStackChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onLoginChange(e) {
        const login = e.target.value
        this.setState({ Login: login });
        fetch("api/Registration/CheckLogin?login=" + login)
            .then(response => response.json())
            .then(data => {
                this.setState({ isLoginUncorrect: data });
            });
        const islogin = this.state.isLoginUncorrect;
        this.setState({ isLoginUncorrect: islogin });
        if (islogin)
            document.getElementById('regbtn').disabled = false;
        else
            document.getElementById('regbtn').disabled = true;
    }
    onPasswordChange(e) {
        this.setState({ Password: e.target.value });
        const cpass = this.state.ConfPassword;
        const pass = e.target.value
        this.setState({ Password: pass });
        this.setState({ ConfPassword: cpass });
        if (pass == cpass) {
            document.getElementById('regbtn').disabled = false;
            this.state.isConfPassUncorrect = false;
        }
        else {
            document.getElementById('regbtn').disabled = true;
            this.state.isConfPassUncorrect = true;
        }
    }
    onEmailChange(e) {
        this.setState({ Email: e.target.value });
    }
    onDescChange(e) {
        this.setState({ Description: e.target.value });
    }
    onStackChange(e) {
        this.setState({ Stack: e.target.value });
    }
    onNameChange(e) {
        this.setState({ Name: e.target.value });
    }
    onPasswordConfimChange(e) {
        const pass = this.state.Password;
        const cpass = e.target.value
        this.setState({ Password: pass });
        this.setState({ ConfPassword: cpass });
        if (pass == cpass) {
            document.getElementById('regbtn').disabled = false;
            this.state.isConfPassUncorrect = false;
        }
        else {
            document.getElementById('regbtn').disabled = true;
            this.state.isConfPassUncorrect = true;
        }

    }
    async onSubmit(e) {
        e.preventDefault();
        var login = this.state.Login;
        var pass = this.state.Password;
        var email = this.state.Email;
        var description = this.state.Description;
        var stack = this.state.Stack;
        var name = this.state.Name;
        var file = this.state.file;
        let formData = new FormData();
        formData.append('Login', login);
        formData.append('Password', pass);
        formData.append('Email', email);
        formData.append('Description', description);
        formData.append('Stack', stack);
        formData.append('Name', name);
        formData.append('Photo', file, 'test.jpg');
        this.state.error = false;
        let response = await fetch("api/Registration",
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
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Пожалуйста загрузите изображение</div>);
        }
        return (
            <Grid justify="center" alignItems="center" container spacing={2}>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">

                    <Grid item xs={12} >
                        <TextField
                            required
                            id="standard-with-placeholder"
                            label="ФИО"
                            value={this.state.Name}
                            onChange={this.onNameChange}
                            margin="normal"
                            autoComplete="off"
                        />
                    </Grid>
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
                        <TextField
                            required
                            id="standard-password-input"
                            label="Повторите пароль"
                            value={this.state.ConfPassword}
                            type="password"
                            autoComplete="new-password"
                            margin="normal"
                            onChange={this.onPasswordConfimChange}
                            readonly
                            onfocus="this.removeAttribute('readonly')"
                        />
                    </Grid>
                    {
                        this.state.isConfPassUncorrect &&
                        <Grid item xs={12} >
                            <h6>Пароли не совпадают</h6>
                        </Grid>
                    }
                    <Grid container justify="center" alignItems="center" item xs={12}>
                        <Avatar alt="Remy Sharp" src={this.state.imagePreviewUrl} style={{
                            margin: 10,
                            width: 100,
                            height: 100
                        }} />
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                    <TextField
                                    required
                                        type="file"
                                        id="standard-with-placeholder"
                                        label="Выберите файл"
                                        onChange={(e) => this._handleImageChange(e)}
                                    />
                            </form>
                    </Grid>
                    <Grid item xs={12} >
                        <Button type="submit" id="regbtn" variant="contained" color="primary" alignItems="center">
                            Регистрация
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );

    }
}