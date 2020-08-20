import React from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Logo from '../assets/logo-la-quinta-sin-fondo.png'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'fixed',
        top: 0,
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
    logo: {
        width: 70,
        height: 70
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

const HeaderComp = ({setInfoBool}) => {
    const classes = useStyles();

    const history = useHistory()

    const goBackButton = () => {
        history.push('/')
        setInfoBool(false)
        //TOD
    }

    return(
        <ThemeProvider theme={theme}>
            <header>
                <Paper elevation={2}
                     className={classes.root}
                     onClick={goBackButton}
                >
                    <img src={Logo} alt="Logo" className={classes.logo}/>
                    <Typography variant="h6" className={classes.widthBig}>
                        La Quinta
                    </Typography>
                </Paper>
            </header>
        </ThemeProvider>
    )
}

export default HeaderComp