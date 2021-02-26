import React, {Fragment, Component} from 'react'

export default class Posts extends Component{
    delete=(id)=>{
        const API='/api/posts/'+id
        const deleteData = {
            method: 'DELETE',
            credentials:'include'
        }
        fetch(API, deleteData)
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            if(!json.success){
                console.log('error')
            }else{
                this.props.update()
            }
        })
    }
    render(){
        if(!this.props.posts){
            return <h1>Loading</h1>
        } else{
            return(
                <Fragment>
                    <table className='card m-3 p-1 m-3'style={{
                        float: 'none',
                        width: '55vw'
                    }}>
                        <tbody>
                        {this.props.posts.map((post)=>{
                            return(
                                <tr className='p-2 card m-1'key={post._id}>
                                    <td className='card-header bg-dark text-light mb-1'>{post.userId}</td>
                                    <td className='p-1 m-1 mt-0'><small>{post.creation}</small></td>
                                    <td>{post.content}</td>
                                    <td><button className='btn btn-sm btn-danger'onClick={()=>this.delete(post._id)}>X</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </Fragment>
            )
        }
    }
}