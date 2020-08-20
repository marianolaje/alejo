import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: '100%',
        maxWidth: 35,
        backgroundColor: theme.palette.background.paper,
    },
    color: {
        color: '#011238',
    },
    noSpaces: {
        margin: 0,
        padding: 0,
    },
    marginLeft: {
        position: 'absolute',
        right: 50
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
            main: '#D90202'
        }
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const Producto = ({infoRow, setInfoRow, setInfoBool}) => {
    const classes = useStyles();

    const [imageIconUse, setImageIconUse] = useState(null)

    const history = useHistory()
    let location = useLocation()
    const url = location.pathname;

    const changeUrl = () => {
        history.push(infoRow.url)
        setInfoRow(infoRow)
        setInfoBool(true)
    }

    useEffect(() => {

        if(infoRow.icon !== undefined && url.indexOf('/') === url.lastIndexOf(url.charAt(url.length-1))){
            setImageIconUse(infoRow.icon)
        } else {
            setImageIconUse(null)
        }

    }, [infoRow, url])


    return (
        <ThemeProvider theme={theme}>
            <List component="nav" aria-label="main mailbox folders" className={classes.noSpaces}>
                <ListItemLink
                    onClick={changeUrl}
                    className={classes.color}
                >
                    {imageIconUse &&
                    (<ListItemIcon>
                        <img
                            src={`${imageIconUse}`}
                            className={classes.imageIcon}
                            alt="iconos"
                        />
                    </ListItemIcon>)
                    }
                    <ListItemText
                        primary={infoRow.title}
                    />
                    <ListItemText
                        className={classes.marginLeft}
                        primary={`$ ${infoRow.price}`}
                    />

                    <IconButton edge="end" aria-label="delete">
                        <ArrowRightIcon color="primary"/>
                    </IconButton>
                </ListItemLink>
                <Divider/>
            </List>
        </ThemeProvider>
    );
}

export default Producto
