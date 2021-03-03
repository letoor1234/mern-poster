import React, {Fragment, Component} from 'react'
import {Redirect} from 'react-router-dom'

import Posts from './Posts'
import NewPost from './NewPost'
import UserInfo from './UserInfo'
import Loading from './Loading'
export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userData: {},
            content: '',
            posts: [],
            redir: false,
            load: true
        }
    }
    componentDidMount=()=>{
        this.getData();
        this.getUser()
    }
    getUser=()=>{
        fetch('/api/users/auth', {credentials:'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            if(json.denegated){
                this.setState({
                    redir: true
                })
            }else{
                this.setState({
                    userData: json
                })
            }
        })
    }
    getData=()=>{
        fetch('/api/friends/myfriends', {credentials:'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                load: false
            })
            if(json.denegated){
                this.setState({
                    redir: true
                })
            }else{
                this.setState({
                    posts: json
                })
            }
        })
    }
    render(){
        if(this.state.load){
            return(<Loading/>) 
        } else{
            if(this.state.redir){
                return(<Redirect to='/'></Redirect>) 
            } else{
                return(
                    <Fragment>
                        <NewPost
                            func={this.getData}
                        />
                        <UserInfo
                            data={this.state.userData}
                        />
                        <Posts
                            posts={this.state.posts}
                            user={this.state.userData.user}
                            update={this.getData}
                        />

                    </Fragment>
                )
            }    
        }  
    }
} 