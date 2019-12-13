import React from 'react'
import axios from 'axios'

import '../Layout.css'

export default class ItemList extends React.Component
{
    constructor()
    {
        super()

        this.handleCreate = this.handleCreate.bind(this)
        this.Logout = this.Logout.bind(this)
        this.enableAddNewItem = this.enableAddNewItem.bind(this)
        this.disableAddNewItem = this.disableAddNewItem.bind(this)
        this.modifyItemForm = this.modifyItemForm.bind(this)
        this.modifyItem = this.modifyItem.bind(this)

        this.deleteItem = this.deleteItem.bind(this)
        this.disableAddNewItem = this.disableAddNewItem.bind(this)

        console.log("constructor")

        this.state = {
            loading: true,
            update: true,
            error: '',
            page: 1,
            limit: 40,
            items:[],
            modifyitemname: ''
        }

        this.updateList(this.state.page, this.state.limit)
    }

    shouldComponentUpdate(nextProps, nextState) {

        console.log("old state:" + this.state.modifyitemname + " new state:" + nextState.modifyitemname)
        if(this.state.modifyitemname !== nextState.modifyitemname)
        {
            return false
        }
        else
        {
            if(this.state.update == false)
            {
                this.setState({update:true})
                return false;
            }
            return true
        }
    }


    render()
    {
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="nav-item nav-link mr-md-2 text-white" href="#">Bienvenido</a>
                    <a href="#" className="text-white" onClick={this.Logout}>Logout</a>
                </nav>
                <div className="center">
                    <div className="card">
                        {
                            this.state.loading === true ? <h1>Cargando...</h1>
                        :
                        <div>
                        <button id='button-add-item' className='form-submit' onClick={this.enableAddNewItem}>Agregar nuevo item</button>
                        <form id='form-add-item' style={{display:this.state.modifyitemname===''?'none':'block', textAlign: 'center'}}>
                            {this.state.modifyitemname === '' ? <p>Agregar Nuevo Item</p> : <p>Modificar Item</p>}
                            <input type="text" ref={(itemname) => this.itemName = itemname} placeholder="Nombre de item" className="form-item"/><br/>
                            <input type="text" ref={(description) => this.description = description} placeholder="Descripción" className="form-item"/><br/>
                            
                            <button className="form-submit" onClick={this.handleCreate}>Guardar</button>
                            <button className="form-submit" onClick={this.disableAddNewItem}>Cancelar</button>
                            {this.renderError()}
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre de Item</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItems()}
                            </tbody>
                        </table>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderItems()
    {
        return(
            this.state.items.map((item, i) => 
                <tr key={i}>
                    <td>{item.itemname}</td>
                    <td>{item.description}</td>
                    <td>
                        <button className='form-submit' onClick={() => this.modifyItemForm(item.itemname, item.description)}>Modificar</button>
                        <button className='form-submit' onClick={() => this.deleteItem(item.itemname)}>Eliminar</button>
                    </td>
                </tr>
            )
        )
    }

    renderError()
    {
        return(
            <div id='error' style={{color:'red'}}>
                {this.state.error}
            </div>
        )
    }


    updateList(page, limit, firstupdate)
    {
        const token = localStorage.getItem("token")
        axios.get(`http://localhost:5000/api/item/getlist/`+page+`/`+limit, {headers: {token}})
        .then(res => {
            const table = JSON.parse(res.data.list)
            if(firstupdate)
                this.setState({items:table,
                loading: false})
            else
                this.setState({items:table,
                loading: false,
                modifyitemname:''})
            console.log(table)
            console.log("end update")
        })
        .catch(error => {
            localStorage.clear()
            window.location = "/login"
            console.log(error.response)
        })
    }

    
    modifyItemForm(itemname, description)
    {
        this.setState({modifyitemname:itemname})
        this.modifyitemname = itemname;
        this.itemName.value = itemname;
        this.description.value = description;
        this.enableAddNewItem()
    }

    deleteItem(itemname)
    {
        const token = localStorage.getItem("token")
        axios.post('http://localhost:5000/api/item/delete/', 
        {
            itemname,
        }, 
        {
            headers: {token}
        })
        .then((response) => {
            console.log(response.data.message)
            this.updateList(this.state.page, this.state.limit, false)
        }, (error) => {
            console.log(error);
            this.setState({error:error.response.data.message, update:false})
        });
    }

    handleCreate(e)
    {   
        //console.log(this.itemName.value)
        //console.log(this.description.value)
        if(this.state.modifyitemname == '')
        this.createItem()
        else
        this.modifyItem()
        
        
    }

    createItem()
    {
        const token = localStorage.getItem("token")
        axios.post('http://localhost:5000/api/item/add/', 
        {
            itemname: this.itemName.value,
            description: this.description.value
        }, 
        {
            headers: {token}
        })
        .then((response) => {
            console.log(response.data.message)
            this.disableAddNewItem()
        }, (error) => {
            console.log(error);
            this.setState({error:error.response.data.message, update:false})
        });
    }


    modifyItem()
    {
        //console.log(this.itemName.value)
        //console.log(this.description.value)
        const token = localStorage.getItem("token")
        axios.post('http://localhost:5000/api/item/modify/', 
        {
            itemname: this.state.modifyitemname,
            newname: this.itemName.value,
            newdescription: this.description.value
        }, 
        {
            headers: {token}
        })
        .then((response) => {
            setTimeout(function() { //Start the timer
                console.log(response.data.message)
            this.disableAddNewItem()
            }.bind(this), 500)
        }, (error) => {
            console.log(error);
            this.setState({error:error.response.data.message, update:false})
        });
    }

    enableAddNewItem()
    {
        document.getElementById('button-add-item').style.display = 'none'
        document.getElementById('form-add-item').style.display = 'block'
        this.modifyitemname = ''
    }

    disableAddNewItem()
    {
        this.itemName.value = ''
        this.description.value = ''
        document.getElementById('button-add-item').style.display = 'block'
        document.getElementById('form-add-item').style.display = 'none'
    }

    Logout()
    {
        localStorage.clear()
        window.location = "/login"
    }

}