import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import HeaderComp from './components/HeaderComp'
import Productos  from './components/Productos'
import TitleSection from './components/TitleSection'
import Informacion from './components/Informacion'
import Carro from './components/Carro'
import Volver from './components/Volver'
import Compra from './components/Compra'

import infoDataJson from './mocks/information.json'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import Mensaje from "./components/Mensaje";

const useStyles = makeStyles(theme => createStyles({
    responseContainer: {
        padding: 32,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        backgroundColor: 'floralwhite',
        margin: '16px 0',
        width: 320
    },
    iconFailure: {
        color: 'red',
        fontSize: 120,
        marginTop: -10
    },
    titleTheme: {
        color: 'black',
        fontWeight: 'normal',
        margin: '10px auto'
    },
    text: {
        color: 'dimgrey',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24
    },
    loadingContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        background: 'white',
        padding: 16,
        [theme.breakpoints.up(480)]: {
            width: 460
        },
        [theme.breakpoints.up(1024)]: {
            marginTop: 64
        },
    },
    margenBot: {
        marginBottom: 130
    }

}));

function App() {
    const classes = useStyles()

    const classes = useStyles()

    const [infoData, setInfoData] = useState([])
    const [infoRow, setInfoRow] = useState([])
    const [infoBool, setInfoBool] = useState(false)
    const [title, setTitle] = useState({})
    const [realUrl, setRealUrl] = useState(true)
    const [goCarro, setGoCarro] = useState(false)
    const [compra, setCompra] = useState([])
    const [mostrarMensaje, setMostrarMensaje] = useState(false)

    useEffect(()=>{
        setInfoData(infoDataJson)
        let a = []
        if(infoData.length>0){
            infoData.map(row => a.push({id: row.id, cuantity: 0, price: row.price, title: row.title}))
        }
        setCompra(a)
    }, [infoData])

    useEffect(()=>{
        setTimeout(function(){
            setMostrarMensaje(false)
        }, 3000)
    }, [mostrarMensaje])


    return (
        <div className={classes.margenBot}>
            <Router >
                <HeaderComp
                    setInfoBool={setInfoBool}
                />

                <TitleSection
                    infoData={infoData}
                    title={title}
                    setTitle={setTitle}
                    setInfoBool={setInfoBool}
                    setRealUrl={setRealUrl}
                    setGoCarro={setGoCarro}
                />
                <Switch>
                    <Route exact path="/cart">
                        <Compra
                            compra={compra}
                        />
                    </Route>
                    <Route path="/">
                        {
                            infoBool && realUrl && !goCarro && (
                                <Informacion
                                    infoData={infoData}
                                    setCompra={setCompra}
                                    compra={compra}
                                />
                            )
                        }
                        {
                            infoData && !infoBool && realUrl && !goCarro && (
                                <Productos
                                    infoData={infoData}
                                    setInfoBool={setInfoBool}
                                    setInfoRow={setInfoRow}
                                />
                            )
                        }
                    </Route>
                </Switch>
                <Carro
                    setGoCarro={setGoCarro}
                    setMostrarMensaje={setMostrarMensaje}
                    compra={compra}
                />
                <Volver
                    setInfoBool={setInfoBool}
                />
                {
                    mostrarMensaje && (
                        <Mensaje/>
                    )
                }
            </Router>
        </div>

    );

}

export default App;


//TODO:
// - Agregar el componente de Compra (entero, con formulario y envío de información)
// - Agregar el botón para sumar items al carro en componente Información
// - Arreglar la medida (kg - g) en Información, para que se imprima de manera correcta
