import React, { Component,Fragment } from 'react'
import {Redirect} from 'react-router-dom'
export default class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            redir: false
        }
    }
    logOut=()=>{
        fetch('/api/users/logout', {credentials:'include'})
        .then((res)=>{
            this.setState({
                redir: true
            })
        })
        .catch((err)=>{
            alert('Error in logout:',err)
        })
    }
    render(){
        if(!this.state.redir){
            return(
                <div className='m-3 p-1 card' style={{
                    width: '30vw',
                    float: 'right'
                }}>
                    <h2 className='text-center card-header bg-dark text-light mb-1'>{this.props.data.user}</h2>
    
                    <button className='btn btn-danger mx-3 my-1'type='button' onClick={this.logOut}>LOGOUT</button>
                </div>
            )
        }else{
            return(<Redirect to='/'></Redirect>)
        }
        
    }
}