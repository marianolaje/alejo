import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: '99999',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
        '& > *': {
            width: theme.spacing(19),
            height: theme.spacing(5),
            padding: theme.spacing(0.5)
        },
    },
    imagens: {
        width: 20,
        height: 20
    },
    volvers: {
        position: 'fixed',
        bottom: '40px',
        left: '30px',
    },
    red: {
        color: 'red',
        textAlign: 'center'
    }
}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Lato"',
            '"Roboto"',
            'sans-serif'
        ].join(','),
    },
});

const Mensaje = () => {
    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.volvers}>
                <Paper elevation={0}
                       className={classes.root}
                >
                    <p className={classes.red}>No has seleccionado nada todavia</p>
                </Paper>
            </div>
        </ThemeProvider>
    )
}

export default Mensaje