import React, {Fragment, useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import * as firebase from "firebase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Icon from "@material-ui/core/Icon";

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
    },  table: {
        minWidth: 650,
    },
    total: {
        width: '354px',
        height: '60px',
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: 400,
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
    const [totalCobrar, setTotalCobrar] = useState(0)

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

    useEffect(()=>{
        funcionCobrar()
    }, [info])

    const eliminarDato = (id) => {
        firebase
            .firestore()
            .collection("compras")
            .doc(id)
            .delete()
            .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    const funcionCobrar = () => {
        let i = 0
        info.forEach(row => i = i + row.total)
        setTotalCobrar(i)
    }

    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Eliminar</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Direccion</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Forma de Pago</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Comentario</TableCell>
                            <TableCell align="right">Producto 1</TableCell>
                            <TableCell align="right">Cantidad 1</TableCell>
                            <TableCell align="right">Producto 2</TableCell>
                            <TableCell align="right">Cantidad 2</TableCell>
                            <TableCell align="right">Producto 3</TableCell>
                            <TableCell align="right">Cantidad 3</TableCell>
                            <TableCell align="right">Producto 4</TableCell>
                            <TableCell align="right">Cantidad 4</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {info.length !== 0 && (
                            info.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">
                                        <Icon>
                                            <DeleteForeverIcon
                                                onClick={()=>eliminarDato(row.id)}
                                            />
                                        </Icon>
                                    </TableCell>
                                    <TableCell align="right">{row.fecha}</TableCell>
                                    <TableCell align="right">{row.nombre}</TableCell>
                                    <TableCell align="right">{row.apellido}</TableCell>
                                    <TableCell align="right">{row.direccion}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.formaPago}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                    <TableCell align="right">{row.comentario}</TableCell>
                                    {row.pedido[0] ? <TableCell align="right">{row.pedido[0].title}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[0] ? <TableCell align="right">{row.pedido[0].cuantity}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[1] ? <TableCell align="right">{row.pedido[1].title}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[1] ? <TableCell align="right">{row.pedido[1].cuantity}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[2] ? <TableCell align="right">{row.pedido[2].title}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[2] ? <TableCell align="right">{row.pedido[2].cuantity}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[3] ? <TableCell align="right">{row.pedido[3].title}</TableCell> : <TableCell align="right"> </TableCell>}
                                    {row.pedido[3] ? <TableCell align="right">{row.pedido[3].cuantity}</TableCell> : <TableCell align="right"> </TableCell>}

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Paper
                    elevation={0}
                    className={classes.total}>
                    <p>Total por cobrar: $ {totalCobrar}
                    </p>
                </Paper>
            </div>
        </ThemeProvider>

    )
}

export default Comprados
