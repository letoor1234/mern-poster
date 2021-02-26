import React, {Fragment, Component} from 'react'

export default class Posts extends Component{
    render(){
        if(!this.props.posts){
            return <h1>Loading</h1>
        } else{
            return(
                <Fragment>
                    <table className='card m-3 p-1 m-3'style={{
                        float: 'none',
                        width: '60vw'
                    }}>
                        <tbody>
                        {this.props.posts.map((post)=>{
                            return(
                                <tr className='p-2 card m-1'key={post._id}>
                                    <td>{post.content}</td>
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