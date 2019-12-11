import React from 'react'



class Item extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            isEditing: false
        }
    }
    render()
    {
        return(
            <tr><td>{this.props.item.itemname}</td><td>{this.props.item.description}</td><td></td></tr>
        )
    }
}

export default Item