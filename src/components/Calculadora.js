import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import PlusOneIcon from '@material-ui/icons/PlusOne';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';

const useStyles = makeStyles((theme) => ({
    cuantity: {
        width: '70px',
        height: '60px',
        position: 'fixed',
        bottom: 30,
        left: 20,
        backgroundColor: '#ebebeb',
    },
    cuantityText: {
        paddingLeft: 26,
        fontSize: 40,
        marginTop: '0px',
        fontWeight: 900,
    },
    plus: {
        width: '28px',
        height: '28px',
        position: 'fixed',
        bottom: 62,
        left: 95,
    },
    minus: {
        width: '28px',
        height: '28px',
        position: 'fixed',
        bottom: 30,
        left: 95
    },
    total: {
        width: '104px',
        height: '28px',
        position: 'fixed',
        bottom: 80,
        left: 0,
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: 900,
        color: '#1B998B'
    },
}));

const theme = createMuiTheme({

    typography: {
        fontFamily: [
            '"Lato"',
            '"Roboto"',
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#1B998B'
        },
        secondary: {
            main: '#011238',
        }
    },
});

const Calculadora = ({info, setCompra, compra}) => {
    const classes = useStyles();
    let location = useLocation()

    const [cuantityState, setCuantityState] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        let a = compra.find(item => item.id === info.id)
        if(a){
            setCuantityState(a.cuantity)
        }

        if(cuantityState===0){
            setTotal(0)
        } else {
            setTotal(cuantityState * info.price)
        }
    }, [cuantityState, info])

    const addOne = () => {
        let response = compra

        let a = response.find(row => row.id === info.id)
        a.cuantity = cuantityState + 1

        setCuantityState(cuantityState + 1)
    }

    const restOne = () => {
        if(cuantityState<=0){
            return
        } else {
            let response = compra
            let a = response.find(row => row.id === info.id)
            a.cuantity = cuantityState - 1
            setCompra(response)
            setCuantityState(cuantityState - 1)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">

                <Paper elevation={0}
                       className={classes.cuantity}
                >
                    <p className={classes.cuantityText}>{cuantityState}</p>
                </Paper>

                <IconButton edge="end" aria-label="delete" className={classes.plus}>
                    <PlusOneIcon
                        color="primary"
                        onClick={addOne}
                    />
                </IconButton>

                <IconButton edge="end" aria-label="delete" className={classes.minus}>
                    <ExposureNeg1Icon
                        color="primary"
                        onClick={restOne}
                    />
                </IconButton>

                <p className={classes.total}>${total}</p>
            </Container>
        </ThemeProvider>

    )
}

export default Calculadora