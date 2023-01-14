import React from 'react';
import Nav from './Nav.jsx';

function Header({ ...props }) {
    return <>
        <header {...{ ...props }}>
            <Nav />
        </header>
    </>
}

export default Header;