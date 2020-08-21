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
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    cuantity: {
        width: '70px',
        height: '70px',
        position: 'fixed',
        bottom: 30,
        left: 100,
        backgroundColor: '#ebebeb',
    },
    cuantityText: {
        paddingLeft: 26,
        paddingTop: 10,
        fontSize: 40,
        marginTop: '0px',
        fontWeight: 900,
    },
    plus: {
        width: '28px',
        height: '28px',
        position: 'fixed',
        bottom: 62,
        left: 175,
    },
    minus: {
        width: '28px',
        height: '28px',
        position: 'fixed',
        bottom: 30,
        left: 175
    },
    total: {
        width: '104px',
        height: '28px',
        position: 'fixed',
        bottom: 80,
        left: 80,
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: 900,
        color: 'black'
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
            main: '#000000'
        },
        secondary: {
            main: '#011238',
        }
    },
});

const Comprados = () => {

    let classes = useStyles()

    const [info, setInfo] = useState([])

    useEffect(()=>{
        firebase
            .firestore()
            .collection('compras')
            .onSnapshot((snapshot) => {
                const newTimes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setInfo(newTimes)
            })
    }, [])

    console.log(info)

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                {info.length !== 0 && (
                    info.map(row => (
                        <Paper elevation={0}
                        >
                            <p>{row.nombre}</p>
                        </Paper>
                    ))
                )}


                <IconButton edge="end" aria-label="delete" className={classes.plus}>
                    <PlusOneIcon
                        color="primary"
                    />
                </IconButton>

            </Container>
        </ThemeProvider>

    )
}

export default Comprados
