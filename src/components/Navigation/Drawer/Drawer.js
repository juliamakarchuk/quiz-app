import React from 'react';
import { NavLink } from 'react-router-dom';

import Backdrop from '../../UI/BackDrop/BackDrop';

import classes from './Drawer.module.css';

const Drawer = (props) => {

   let clickHandler = () => {
        props.onClose();
    }

    let renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={clickHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    const cls = [classes.Drawer];

    if (!props.isOpen) {
        cls.push(classes.close)
    }

    const links = [
        { to: '/', label: 'List', exact: true },
    ]

    if (props.isAuthenticated) {
        links.push({ to: '/quiz-creator', label: 'Create test', exact: false });
        links.push({ to: '/logout', label: 'Exit', exact: false })
    } else {
        links.push({ to: '/auth', label: 'Auth', exact: false })
    }

    return (
        <>
            <nav className={cls.join(" ")}>
                <ul>
                    {
                        renderLinks(links)
                    }
                </ul>
            </nav>
            {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
        </>
    )
}

export default Drawer;