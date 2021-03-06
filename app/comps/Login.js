import React, {Fragment, Component} from 'react'
import { Link,Redirect } from 'react-router-dom'
import Loading from './Loading'
import Alert from './Alert'
export default class Login extends Component{
    mounted= false
    constructor(props){
        super(props)
        this.state={
            user: '',
            pass: '',
            redir: false,
            load: true,

            alertStyle: {
                position: 'absolute',
                left: '50vw',
                transform: 'translateX(-50%)',
                top: '-50%'
            } ,
            alertTitle: "",
            alertContent:""
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
    send=(e)=>{
        const API = '/api/users/login'

        const postData = {
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                user: this.state.user,
                pass: this.state.pass
            }),
            credentials:'include'
        }

        fetch(API, postData)
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{ 
            if(!json.user){
                if(!json.userExist){
                    this.setState({
                        alertStyle: {
                            position: 'absolute',
                            left: '50vw',
                            transform: 'translateX(-50%)',
                            top: '35%',
                            transition: 'top 1s'
                        } ,
                        alertTitle: "This user doesn't exists",
                        alertContent:"Try again!!"
                    })
                } else{
                    if(!json.passVerified){
                        this.setState({
                            alertStyle: {
                                position: 'absolute',
                                left: '50vw',
                                transform: 'translateX(-50%)',
                                top: '35%',
                                transition: 'top 1s'
                            } ,
                            alertTitle: "Incorrect password!",
                            alertContent:"Try again!!"
                        })
                    }
                }
            } else{
                this.setState({
                    redir: true
                })
            }         
        })

        e.preventDefault();
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
    closeAlert=()=>{
        this.setState({
            alertStyle: {
                position: 'absolute',
                left: '50vw',
                transform: 'translateX(-50%)',
                top: '-50%',
                transition: 'top 1s'
            }
        })
    }
    render(){
        if(this.state.load){
            return <Loading/>
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
                            <h3 className='text-center card-header bg-dark text-light mb-1'>Login</h3>

                            <label htmlFor='user'>User Name</label>
                            <input className='form-control p-1 mb-2'type='text' id='user' name='user' onChange={(e)=>this.inputChange(e)} value={this.state.user}></input>

                            <label htmlFor='pass'>Password</label>
                            <input className='form-control p-1 mb-2'type='password' id='pass' name='pass' onChange={(e)=>this.inputChange(e)} value={this.state.pass}></input>

                            <button className='btn btn-info mx-3 my-1'type='submit'>LOGIN</button>
                            <Link to='/register'className='btn btn-outline-secondary mx-4 my-1'>
                                Create new account!
                            </Link>
                        </form>
                        <Alert
                            style= {this.state.alertStyle}
                            title= {this.state.alertTitle}
                            content= {this.state.alertContent}
                            func= {this.closeAlert} 
                        /> 
                    </Fragment>
                )
            }
        }
    }
}