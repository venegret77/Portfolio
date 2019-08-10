import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavMenu from './NavMenu';
import { Main } from './Main';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        justify: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid justify="center" container spacing={3}>
                <Grid  item xs={11} >
                    <NavMenu />
                </Grid>
                <Grid item xs={11} >
                    <Main />
                </Grid>
            </Grid>
        </div>
    );
}
export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <CenteredGrid />
        );
    }
}
