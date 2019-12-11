import React from 'react'
import axios from 'axios'

class Form extends React.Component{
    constructor()
    {
        super()

        this.handleCreate = this.handleCreate.bind(this)

        this.state = {
            error: null
        }
    }

    render()
    {
        return(
            <form onSubmit={this.handleCreate}>
                <input type="text" ref={(itemname) => this.itemName = itemname} placeholder="Nombre de item"/>
                <input type="text" ref={(description) => this.description = description} placeholder="Descripción"/>
                <input type="submit"/>
                {this.renderError()}
            </form>
        )
    }

    renderError()
    {
        return(
            <div style={{color:'red'}}>
                {this.state.error}
            </div>
        )
    }

    handleCreate(e)
    {
        e.preventDefault();
        console.log(this.itemName.value)
        console.log(this.description.value)

        axios.post('http://localhost:5000/api/item/add/', 
        {
            itemname: this.itemName.value,
            description: this.description.value
        })
        .then((response) => {
            if(response.data.message != null)
            {
                if(response.data.message !== 'Item creado.')
                {
                    this.setState({error: response.data.message})
                }
            }
            else
            {
                this.setState({error:''})
            }
        }, (error) => {
            console.log(error);
        });

        this.itemName.value = ''
        this.description.value = ''
    }
}

export default Form