import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'red',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

const Error = ({errorMessage}) => {
    const classes = useStyles();

    return(
        <Paper elevation={0}>
            <p className={classes.root}>{errorMessage}</p>
        </Paper>
    )
}

export default Error