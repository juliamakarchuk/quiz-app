import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/actions/auth';

const Logout = ({logout}) => {

    useEffect(() => {
        logout()
        // eslint-disable-next-line
    }, [])

    return <Redirect to={'/'} />
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)