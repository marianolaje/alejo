import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Calculadora from "./Calculadora";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        whiteSpace: 'pre-wrap',
    },
    alignCenter: {
        textAlign: 'center',
        boxShadow: '0px -2px 2px 0px #E5E7EB',
        paddingTop: 10
    },
    spreadButtons: {
        marginRight: 40,
    },
    buttonSize: {
        '& button': {
            maxHeight: 20,
            fontSize: 10,
        }
    },
    images: {
        maxWidth: '300px',
        display: 'flex',
        textAlign: 'center',
        margin: '0px auto'
    },
    videos: {
        [theme.breakpoints.down(580)]: {
            maxWidth: '315px',
        },
        [theme.breakpoints.up(580)]: {
            maxWidth: '760px',
            height: '400px',
        },

        marginTop: 30
    },
    containerInfo: {
        backgroundColor: 'transparent',
        paddingBottom: 30
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
    palette: {
        primary: {
            main: '#28C339'
        },
        secondary: {
            main: '#011238',
        }
    },
});

const Informacion = ({infoData, setCompra, compra, total, setTotal}) => {
    const classes = useStyles();
    let location = useLocation()

    const [info, setInfo] = useState([])
    const [arrayInfo, setArrayInfo] = useState([])

    const listInfo = () => {
        let result = info.content.split(',')
        setArrayInfo(result)
    }

    useEffect(()=>{
        setInfo(infoData.filter(row => row.url === location.pathname)[0])
        if(info.length !== 0){
            listInfo()
        }
    }, [info])

    const listComponent = () => {
        const resultInfo = arrayInfo ?
            arrayInfo.map((infoRow) => (
                <li key={infoRow}>{infoRow}</li>
            ))
            : null
        return resultInfo
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" className={classes.containerInfo}>

                <Paper elevation={2}
                       className={classes.root}
                >
                    {
                        info &&
                        (
                            <div>
                                <h5>{info.subtitle}</h5>
                                <ul>
                                    {listComponent()}
                                </ul>
                                <h5>{info.notaFinal}</h5>
                                <h5>{info.notaFinalDos}</h5>
                            </div>
                        )
                    }

                    {
                        info.imageOne && Object.keys(info).length > 0 && (
                            <img src={`${info.imageOne}`}
                                  alt="img"
                                  width="100%"
                                  className={classes.images}
                            />
                        )
                    }
                </Paper>
            </Container>
            <Calculadora
                info={info}
                setCompra={setCompra}
                compra={compra}
                total={total}
                setTotal={setTotal}
            />
        </ThemeProvider>

    )
}

export default Informacion