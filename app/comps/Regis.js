import React, {Fragment, Component} from 'react'
import { Link,Redirect } from 'react-router-dom'
import Loading from './Loading'
import Alert from './Alert'
export default class Register extends Component{
    mounted= false
    constructor(props){
        super(props)
        this.state={
            user: '',
            pass: '',
            mail: '',
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
                this.setState({
                    alertStyle: {
                        position: 'absolute',
                        left: '50vw',
                        transform: 'translateX(-50%)',
                        top: '35%',
                        transition: 'top 1s'
                    } ,
                    alertTitle: 'This mail are ready in use!',
                    alertContent:"Try using another"
                })
            }else{
                if(json.userExist){
                    this.setState({
                        alertStyle: {
                            position: 'absolute',
                            left: '50vw',
                            transform: 'translateX(-50%)',
                            top: '35%',
                            transition: 'top 1s'
                        } ,
                        alertTitle: 'This user name are ready in use!',
                        alertContent:"Try using another"
                    })
                } else{
                    this.setState({
                        redir: true
                    })
                }
            }       
        })

        e.preventDefault();
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
                        <form className='col-sm-12 col-md-10 col-lg-7 m-3 card p-1'onSubmit={(e)=>this.send(e)}style={{
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
    
                            <button className='btn btn-info mx-3 my-1'type='submit'>CREATE ACCOUNT</button>
                            <Link to='/'className='btn btn-outline-secondary mx-4 my-1'>
                                I have an account 
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