import React, {Component, Fragment} from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'

export default class Searcher extends Component{
    constructor(props){
        super(props)
        this.state={
            all: [],
            searched: [],
            input: '',
            redir: false
        }
    }
    componentDidMount=()=>{
        this.getData()
    }
    getData=()=>{
        const API = '/api/friends'
        fetch(API, {credentials: 'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            if(json.denegated){
                this.setState({
                    redir:true
                })
            } else{
                this.setState({
                    all: json,
                    searched: json
                })
            }
        })
    }
    inputChange=(e)=>{
        var text = e.target.value
        const array = this.state.all
        var newArray = array.filter((item)=>{
            const itemData = item.user.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
          })
        this.setState({
            input: text,
            searched: newArray
        })
    }
    render(){
        if(!this.state.redir){
            return(
                <div className='m-3'style={{
                    width: '50vw'
                }}>
                    <input className='form-control p-1 mb-2'type='text' value={this.state.input} onChange={(e)=>this.inputChange(e)}/> 
                    <ul className='list-group'>
                        {this.state.searched.map((other)=>{
                            return <li className='list-group-item d-flex justify-content-between align-items-center'key={other._id}>
                                <Link to={'/profile/'+other.user}>{other.user}</Link></li>
                        })}
                    </ul>
                </div>
            )
        } else{
            return (<Redirect to='/'></Redirect>)
        }
        
    }
}