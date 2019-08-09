import React, { Component } from 'react'
import './Registration.css';

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
        else
        {
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
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        required
                        placeholder="ФИО"
                        value={this.state.Name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                        required
                        placeholder="Имя пользователя"
                        value={this.state.Login}
                        onChange={this.onLoginChange} />
                </p>
                {
                    this.state.isLoginUncorrect &&
                    <p>
                        Пользователь с таким именем пользователя уже существует!
                    </p>
                }
                <p>
                    <input type="password"
                        required
                        placeholder="Пароль"
                        value={this.state.Password}
                        onChange={this.onPasswordChange} />
                </p>
                <p>
                    <input type="password"
                        required
                        placeholder="Повторите пароль"
                        value={this.state.ConfPassword}
                        onChange={this.onPasswordConfimChange} />
                </p>
                {
                    this.state.isConfPassUncorrect &&
                    <p>
                        Пароли не совпадают!
                    </p>
                }
                <p>
                    <input type="text"
                        placeholder="Почта"
                        value={this.state.Email}
                        onChange={this.onEmailChange} />
                </p>
                <p>
                    <textarea type="text"
                        placeholder="О себе"
                        value={this.state.Description}
                        onChange={this.onDescChange} />
                </p>
                <p>
                    <textarea type="text"
                        placeholder="Навыки"
                        value={this.state.Stack}
                        onChange={this.onStackChange} />
                </p>
                <p>
                    <div className="previewComponent">
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} />
                        </form>
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                    </div>
                </p>    
                <p>
                    <input id="regbtn" type="submit" value="Регистрация" />
                </p>
                {
                    this.state.error &&
                    <p>
                        <h1>Что-то не так!</h1>
                    </p>
                }
            </form>
        );

    }
}