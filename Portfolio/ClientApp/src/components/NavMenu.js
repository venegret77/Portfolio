import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, RouterLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function ButtonAppBarLogin() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit"><Link to={'/'} style={{ color: '#FFF' }}>На главную</Link></Button>
                    </Typography>
                    <Button color="inherit"><Link to={'/login'} style={{ color: '#FFF' }}>Войти</Link></Button>
                    <Button color="inherit"><Link to={'/registration'} style={{ color: '#FFF' }}>Зарегистрироваться</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to={'/profile'} style={{ color: '#000' }}>Мой профиль</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to={'/projects'} style={{ color: '#000' }}>Мои проекты</Link></MenuItem>
            </Menu>
        </div>
    );
}

export function ButtonAppBarLogout() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <SimpleMenu/>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit"><Link to={'/'} style={{ color: '#FFF' }}>На главную</Link></Button>
                    </Typography>
                    <Button color="inherit"><Link to={'/logout'} style={{ color: '#FFF' }}>Выйти</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.CheckAuth();
    }

    async CheckAuth() {
        this.state = { user: Object };
        this.state.user = "unkown user";
        await fetch('api/Main/GetMyUser')
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data });
            });
    }

    render() {
        if (this.state.user.login == null) {
            return (
                <ButtonAppBarLogin />
            );
        }
        else {
            return (
                <ButtonAppBarLogout />
            );
        }
    }
}
