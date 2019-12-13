import React from 'react'
import Login from '../login/Login'
import ItemList from '../itemlist/ItemList'

class Home extends React.Component
{
    render()
    {
        return(<div>{localStorage.getItem("token") == null ? <Login/> : <ItemList/>}</div>)
    }
}

export default Home