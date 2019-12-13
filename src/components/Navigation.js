import React from 'react';

class Navigation extends React.Component
{
    render()
    {
        return(
            <nav className="navbar navbar-dark bg-dark">
                <a className="nav-item nav-link mr-md-2 text-white">Bienvenido</a>
                <a href="" className="text-white">Logout</a>
            </nav>
        )
    }
}

export default Navigation