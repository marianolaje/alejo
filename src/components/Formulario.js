import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import {ThemeProvider} from "@material-ui/styles";
import Error from './Error'
import MenuItem from "@material-ui/core/MenuItem";
import Pedidos from '../mocks/pedidos.json'

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
        }
    },
});

const useStyles = makeStyles((theme) => ({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
            maxWidth: '600px',
        },
    },
    buttonSend: {
        padding: '6px 15vw',
        margin: '15px 0px',
        backgroundColor: '#1B998B',
        color: 'white',
        textDecoration: 'none',
        "&:active, &:hover":{
            backgroundColor: "#1B998B",
        },
    },
    input: {
        display: 'none',
    },
    containerForm: {
        backgroundColor: 'white',
        padding: '10px',
        marginTop: 50
    },
    recuadro: {
        margin: 5,
        width: '95%'
    },
    a: {
        textDecoration: 'none'
    }
}));

const currencies = [
    {
        value: 'Mercado Pago',
        label: 'Mercado Pago',
    },
    {
        value: 'Transferencia Bancaria',
        label: 'Transferencia Bancaria',
    },
    {
        value: 'Efectivo',
        label: 'Efectivo',
    },
];

const Formulario = ({compraReal}) => {
    const classes = useStyles();

    const [search, setSearch] = useState({
        nombre: '',
        apellido: '',
        email: '',
        comentario: '',
        direccion: '',
        formaPago: ''
    })
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    function addInfoToJsonFile (msg) {
        let obj = {
            table: []
        };
        obj.table.push({msg});
        let json = JSON.stringify(obj);
        let fs = require('fs');
        fs.writeFile('../mocks/pedidos.json', json);

    }

    function sendMessage () {
        let pedido = ''
        pedido = compraReal.map(text => (pedido.concat(text.cuantity).concat(' del ').concat(text.title).concat(', ')))
        let num = '5493513088140'
        let msg = `Buenos dias, soy ${search.nombre} ${search.apellido}. Quisiera pedir ${pedido.join('')}. Vivo en ${search.direccion}, y pagaré con ${search.formaPago}. ${search.comentario ? search.comentario : ''} Muchas gracias! (mi mail es ${search.email})`


        if (search.email.trim() === '') {
            setError(true)
            setErrorMessage('Introduce un email')
            return
        }
        if (!search.email.includes('@') || !search.email.includes('.')) {
            setError(true)
            setErrorMessage('Introduce un email válido')
            return
        }
        if (search.nombre.trim() === '') {
            setError(true)
            setErrorMessage('Introduce un nombre')
            return
        }
        if (search.formaPago.trim() === '') {
            setError(true)
            setErrorMessage('Introduce una forma de pago')
            return
        }
        if (search.direccion.trim() === '') {
            setError(true)
            setErrorMessage('Introduce una dirección, lo más detallada posible por favor')
            return
        }
        setError(false)

        let win = window.open(`https://wa.me/${num}?text=${msg}`);

        addInfoToJsonFile(msg)

        return win
    }

    return (
        <Container maxWidth="sm" className={classes.containerForm}>
            <ThemeProvider theme={theme}>
                <form
                    className={classes.root}
                    noValidate autoComplete="off"
                    method="post"
                    action=""
                    disabled
                    encType="multipart/form-data"
                >
                    <div>
                        <TextField
                            className={classes.recuadro}
                            id="nombre"
                            variant="outlined"
                            label="Nombre"
                            name="nombre"
                            value={search.nombre}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.recuadro}
                            id="apellido"
                            variant="outlined"
                            label="Apellido"
                            name="apellido"
                            value={search.apellido}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.recuadro}
                            id="email"
                            variant="outlined"
                            label="Correo electrónico"
                            name="email"
                            value={search.email}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.recuadro}
                            id="direccion"
                            variant="outlined"
                            label="Dirección"
                            name="direccion"
                            value={search.direccion}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.recuadro}
                            id="formaPago"
                            select
                            name="formaPago"
                            label="Forma de pago"
                            value={search.formaPago}
                            variant="outlined"
                            onChange={handleChange}
                            helperText="Por favor seleccione su forma de pago"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className={classes.recuadro}
                            id="comentario"
                            variant="outlined"
                            label="Comentario"
                            name="comentario"
                            helperText="¿Desea dejarnos algún comentario?"
                            value={search.comentario}
                            onChange={handleChange}
                        />
                    </div>

                    {error ? <Error errorMessage={errorMessage}/> : null}
                    <Button
                        variant="contained"
                        className={classes.buttonSend}
                        onClick={sendMessage}
                    > Comprar
                    </Button>
                    <p style={{color: 'red', fontSize: 10}}>Los pedidos son entregados el dia Lunes de cada semana</p>
                </form>
            </ThemeProvider>
        </Container>
    )
}

export default Formulario
