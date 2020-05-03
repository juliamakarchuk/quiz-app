import React, { useState } from 'react';
import { connect } from 'react-redux';

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

import classes from './Layout.module.css';

const Layout = (props) => {

    let [menu, setMenu] = useState(false);

    let toggleMenuHandler = () => {
        setMenu(!menu);
    }

    let menuCloseHandler = () => {
        setMenu(false);
    }

    return (
        <div className={classes.Layout}>
            <Drawer
                isOpen={menu}
                onClose={menuCloseHandler}
                isAuthenticated={props.isAuthenticated}
            />

            <MenuToggle
                onToggle={toggleMenuHandler}
                isOpen={menu}
            />
            <main>
                {props.children}
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);