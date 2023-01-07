import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header.jsx';

function About() {
    return <>
        <Header />
        <main>
            <div>Cosas hermosas sobre nosotrxs y link a Linkedin y GitHub que queda muy PRO</div>
            <NavLink to="/">Back</NavLink>
        </main>
    </>;
}

export default About;