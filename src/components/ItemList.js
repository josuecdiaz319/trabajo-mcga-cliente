import React from 'react'
import axios from 'axios'

import Form from './Form'
import ItemListHeader from './ItemListHeader'
import Item from './Item'

export default class ItemList extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            page: 1,
            limit: 50,
            items:[]
        }
    }

    updateList(page, limit, object)
    {
        axios.get(`http://localhost:5000/api/item/getlist/`+page+`/`+limit)
        .then(res => {
            const table = JSON.parse(res.data.list)
            object.setState({items:table})
            console.log(table)
        })
    }
    updateCurrentPage(object)
    {
        object.forceUpdate();
    }

    componentDidMount()
    {
        this.updateList(this.state.page, this.state.limit, this)
    }

    renderItems()
    {
        return(
            this.state.items.map((item, i) => <Item item={item} key={i}/>)
        )
    }

    render()
    {
        return(
            <div>
                <Form/>
                <table>
                    <ItemListHeader/>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </div>
        )
    }
}