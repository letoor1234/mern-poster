import React, {Fragment, Component} from 'react'
import {Redirect} from 'react-router-dom'

import Posts from './Posts'
import NewPost from './NewPost'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            content: '',
            posts: [],
            redir: false,
            load: true
        }
    }
    componentDidMount=()=>{
        fetch('/api/users/auth', {credentials:'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                load: false
            })
            if(!json.user){
                this.setState({
                    redir: true
                })
            }
        })
        this.getData();
    }
    getData=()=>{
        fetch('/api/posts', {credentials:'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                posts: json
            })
        })
    }
    render(){
        if(this.state.load){
            return(<h1>LOADING...</h1>)
        } else{
            if(this.state.redir){
                return(<Redirect to='/'></Redirect>)
            } else{
                return(
                    <Fragment>
                        <NewPost
                            func={this.getData}
                        />
                        <Posts
                            posts={this.state.posts}
                        />
                    </Fragment>
                )
            }    
        }  
    }
} 