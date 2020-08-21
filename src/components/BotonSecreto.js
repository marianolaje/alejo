import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 999999999,
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        border: 'none'
    }
}));

const Compra = () => {
    let classes = useStyles()
    let history = useHistory()

    const openSecretPage = () => {
        let response = window.prompt('clave')
        if(response === 'marianolaje'){
            history.push('/comprados-darla')
        }
    }

    return (
        <button
            className={classes.root}
            onClick={openSecretPage}
        ></button>
    )
}

export default Compra