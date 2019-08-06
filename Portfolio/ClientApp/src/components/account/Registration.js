import React, { Component } from 'react';

export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = { Login: "", Password: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ Login: e.target.value });
    }
    onPriceChange(e) {
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

        let response = await fetch("api/Account",
            {
                body: formData,
                method: "post"
            });
        if (!response.ok) {
            alert("Неверный логин или пароль!");
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
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="password"
                        placeholder="Пароль"
                        value={this.state.Password}
                        onChange={this.onPriceChange} />
                </p>
                <input type="submit" value="Зарегистрироваться" />
            </form>
        );
    }
}