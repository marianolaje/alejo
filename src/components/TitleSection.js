import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: '100%',
        maxWidth: 30,
        backgroundColor: theme.palette.background.paper,
        display: 'inline',
        marginLeft: '20px'
    },
    textTitle: {
        width: '90vw',
        textAlign: 'center',
        display: 'inline-block',
        color: 'white',
    },
    containerDiv: {
        marginTop: 100,
        backgroundColor: '#D90202',
        maxWidth: 660,
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down(580)]: {
            paddingLeft: 10
        },
        [theme.breakpoints.up(580)]: {
            textAlign: 'center',
        },
    },
    containerDivInfo: {
        marginTop: 80,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down(580)]: {
            paddingLeft: 10
        },
        [theme.breakpoints.up(580)]: {
            textAlign: 'center',
        },
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

const TitleSection = ({title, setTitle, infoData, setInfoBool, setRealUrl, setGoCarro}) => {
    const [boolControl, setBoolControl] = useState(false)

    const classes = useStyles();
    let location = useLocation()

    const url = location.pathname

    let infoArrive = (infoFile) => {
        return Object.keys(infoFile).length > 0
    }

    useEffect(()=>{
        knowTitle()
        if(infoArrive(infoData) && !boolControl) setBoolControl(true)
        if(url !== '/'){
            setInfoBool(true)
        }
        if(url !== '/cart'){
            setGoCarro(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoData, location, boolControl])

    const knowTitle = () => {
        if(infoArrive(infoData) && url === '/'){
            setTitle({title: `Elija sus productos`})
            setRealUrl(true)
            return
        }

        if(boolControl && infoData.filter(info => info.url === url).length>0){
            setTitle(infoData.filter(info => info.url === url)[0])
            setRealUrl(true)
        }
        else if(url === '/cart'){
            setRealUrl(true)
        }
        else {
            setTitle({title: "La URL ingresada no existe."})
            setRealUrl(false)
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <div className={url.indexOf('/') !== url.lastIndexOf('/') ? classes.containerDivInfo : classes.containerDiv}>
                {title && infoArrive(title) && (
                    <h2 className={classes.textTitle}>{title.title}</h2>
                )}
            </div>
        </ThemeProvider>
    )
}


export default TitleSection
