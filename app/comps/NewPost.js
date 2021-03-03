import React, {Fragment, Component} from 'react'

export default class Posts extends Component{
    constructor(props){
        super(props)
        this.state={
            content: '',
            load: true
        }
    }
    inputChange=(e)=>{
        const {id, value} = e.target

        this.setState({
            [id]: value
        })
    }
    send=(e)=>{
        const API = '/api/posts'

        const postData = {
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                content: document.getElementById('content').value,
            }),
            credentials:'include'
        }
        
        fetch(API, postData)
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            if(json.postCreated){
                this.setState({
                    content: '',
                })
                this.props.func()
            } else{
                console.log('error')
            }
            
        })

        e.preventDefault();
    }
    render(){
        return(
            <Fragment>
                <form className='card m-3 p-1 m-3'onSubmit={(e)=>this.send(e)} style={{
                    float: 'left',
                    display: 'flex',
                    width: '55vw',
                    flexDirection: 'column'
                }}>
                    <label htmlFor='title'>New Post!</label>
                    <textarea style={{
                        maxWidth: '90%',
                        maxHeight: '5em'
                    }}className='form-control p-1 m-2'type="text" id='content' onChange={(e)=>this.inputChange(e)} value={this.state.content}></textarea>
                    <button className='btn btn-info m-3' type='submit'>Post!</button>
                </form>
            </Fragment>
        )
    }
}