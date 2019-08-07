import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.CheckAuth();
    }

    async CheckAuth() {
        this.state = { user: Object };
        this.state.user = "unkown user";
        await fetch('api/Main/GetUser')
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data });
            });
        //if (this.state.user.login == null) window.location.replace("/login");
    }

    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>Главная страница</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {this.state.user.login != null ? (
                            [
                                <LinkContainer to={'/projects'}>
                                    <NavItem>
                                        <Glyphicon glyph='test1' /> Мои проекты
                                    </NavItem>
                                </LinkContainer>,
                                <LinkContainer to={'/logout'}>
                                    <NavItem>
                                        <Glyphicon glyph='test1' /> Выйти
                                    </NavItem>
                                </LinkContainer>
                            ]
                        ) : (
                                [
                                    <LinkContainer to={'/login'}>
                                        <NavItem>
                                            <Glyphicon glyph='education' /> Войти
                                        </NavItem>
                                    </LinkContainer>,
                                    <LinkContainer to={'/registration'}>
                                        <NavItem>
                                            <Glyphicon glyph='th-list' /> Зарегистрироваться
                                        </NavItem>
                                    </LinkContainer>
                                ]
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
