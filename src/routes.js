import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

//Componentes

import Login from './components/login/Login'
import ItemList from './components/itemlist/ItemList'

class Routes extends React.Component
{
    render()
    {
        const token = localStorage.getItem("token")
        //console.log("Token: " + token)

        return(
            <Router>
                {token == null ?
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Redirect from='/' to='/login'/>
                </Switch>
                :
                <Switch>
                    <Route exact path='/itemlist' component={ItemList}/>
                    <Redirect from='/' to='/itemlist'/>
                </Switch>
                }
            </Router>
        )
    }
}

export default Routes