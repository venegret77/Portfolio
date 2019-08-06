import React, { Component } from 'react'

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
                method: "POST"
            });
        if (!response.ok) {
            this.state.error = true;
            this.render();
        }
        else
        {
            window.location.replace("/");
        }
        this.setState({ Login: "", Password: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                
                <p>
                    <input type="text"
                        placeholder="Логин"
                        value={this.state.Login}
                        onChange={this.onLoginChange} />
                </p>
                <p>
                    <input type="password"
                        placeholder="Пароль"
                        value={this.state.Password}
                        onChange={this.onPasswordChange} />
                </p>

                <input type="submit" value="Войти" />

                {
                    this.state.error &&
                    <p>
                        <h1>Неверный логин или пароль!</h1>
                    </p>
                }
            </form>
        );
        
    }
}