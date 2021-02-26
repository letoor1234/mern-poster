import React, {Fragment, Component} from 'react'
import { Link,Redirect } from 'react-router-dom'

export default class Register extends Component{
    mounted= false
    constructor(props){
        super(props)
        this.state={
            user: '',
            pass: '',
            mail: '',
            redir: false,
            load: true
        }
    }
    componentDidMount=()=>{
        this.mounted= true
        fetch('/api/users/auth', {credentials:'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                load: false
            })
            if(json.user){
                if(this.mounted){
                    this.setState({
                        redir: true
                    }) 
                } 
            }
        })
    }
    componentWillUnmount=()=>{
        this.mounted= false
    }
    inputChange=(e)=>{
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    send=(e)=>{
        const API = '/api/users/register'

        const postData = {
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                user: this.state.user,
                mail: this.state.mail,
                pass: this.state.pass,
            }),
            credentials:'include'
        }

        fetch(API, postData)
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            if(json.mailExist){
                alert('This mail are ready in use!')
                console.log('mail exists yet')
            }else{
                if(json.userExist){
                    alert('This user are ready in use!')
                    console.log('user exists yet')
                } else{
                    this.setState({
                        redir: true
                    })
                }
            }       
        })

        e.preventDefault();
    }
    render(){
        if(this.state.load){
            return <h1>Loading</h1>
        } else{
            if(this.state.redir){
                return <Redirect to='/home'></Redirect>
            } else{
                return(
                    <Fragment>
                        <form className='m-3 card p-1'onSubmit={(e)=>this.send(e)}style={{
                            display: 'flex',
                            width: '40vw',
                            flexDirection: 'column'
                        }}>
                            <h3 className='text-center card-header bg-dark text-light mb-1'>Register</h3>
    
                            <label htmlFor='user'>User Name</label>
                            <input className='form-control p-1 mb-2'type='text' id='user' name='user' onChange={(e)=>this.inputChange(e)} value={this.state.user}></input>
    
                            <label className=''htmlFor='mail'>Email</label>
                            <input className='form-control p-1 mb-2'type='text' id='mail' name='mail' onChange={(e)=>this.inputChange(e)} value={this.state.mail}></input>
    
                            <label htmlFor='pass'>Password</label>
                            <input className='form-control p-1 mb-2'type='password' id='pass' name='pass' onChange={(e)=>this.inputChange(e)} value={this.state.pass}></input>
    
                            <button className='btn btn-success mx-3 my-1'type='submit'>CREATE ACCOUNT</button>
                            <Link to='/'className='btn btn-outline-secondary mx-4 my-1'>
                                I have an account 
                            </Link>
                        </form>  
                    </Fragment> 
                )
            }
        } 
    }
}