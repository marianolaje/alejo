import React from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import SvgIcon from "@material-ui/core/SvgIcon";


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
    imagens: {
        width: 20,
        height: 20
    },
    volvers: {
        position: 'fixed',
        bottom: '80px',
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

const Carro = ({setGoCarro, setMostrarMensaje, compra}) => {
    const classes = useStyles();

    const history = useHistory()

    const goBackButton = () => {
        console.log(compra.find(a => a.cuantity>0))
        if (compra.find(a => a.cuantity>0) === undefined) {
            setMostrarMensaje(true)
        } else {
            history.push('/cart')
            setGoCarro(true)
        }
    }

    return(
        <ThemeProvider theme={theme} className={classes.root}>
            <div className={classes.volvers}>
                <Paper elevation={2}
                       className={classes.root}
                       onClick={goBackButton}
                >
                    <SvgIcon component={ShoppingCartIcon} style={{ color: '#D7263D', backgroundColor: '#ebebeb' }} className={classes.imagens} />
                </Paper>
            </div>
        </ThemeProvider>
    )
}

export default Carro