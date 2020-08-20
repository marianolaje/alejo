import React from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Arrow from '../assets/arrow.png'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ebebeb',
        zIndex: '99999',
        width: '100%',
        flexWrap: 'wrap',
        paddingLeft: '20px',
        boxShadow: '0px 2px #E5E7EB',
        '& > *': {
            margin: theme.spacing(1.3),
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    },
    widthBig: {
        width: 150,
        marginTop: 23,
        fontSize: 30
    },
    imagen: {
        width: 20,
        height: 20,
        backgroundColor: '#ebebeb',
    },
    volver: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
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

const Volver = ({setInfoBool}) => {
    const classes = useStyles();

    const history = useHistory()

    const goBackButton = () => {
        history.go(-1)
        setInfoBool(false)
    }

    return(
        <ThemeProvider theme={theme} className={classes.root}>
            <div className={classes.volver}>
                <Paper elevation={2}
                       className={classes.root}
                       onClick={goBackButton}
                >
                    <img src={Arrow} alt="Logo" className={classes.imagen}/>
                </Paper>
            </div>
        </ThemeProvider>
    )
}

export default Volver