import React, {Component, Fragment} from 'react'

import Loading from './Loading'
export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            user: this.props.match.params.user,
            id: this.props.match.params.id,
            friends: [],
            posts: [],
            button: '',
            load: true
        }
    }
    componentDidMount=()=>{
        this.getPosts()
        this.getFriendsList()
    }
    getFriendsList=()=>{
        const API='/api/friends/list'

        fetch(API, {credentials: 'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                friends: json,
                load: false
            })
            this.filterFriends()
        })
    }
    filterFriends=()=>{
        var thisFriend = this.state.user
        const array = this.state.friends.friends
        var newArray = array.filter((item)=>{
            const itemData = item.friendId.toUpperCase()
            const textData = thisFriend.toUpperCase()
            return itemData.indexOf(textData) > -1
          })
        if(newArray.length >= 1){
            this.setState({
                button: (<button onClick={this.deleteFriend} className='btn btn-danger'>Delete</button>)
                
            })
        }else{
            this.setState({
                button: (<button onClick={this.addFriend} className='btn btn-info'>Add</button>)
            })
        }
    }
    getPosts=()=>{
        const API='/api/posts/'+this.state.user

        fetch(API, {credentials: 'include'})
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            this.setState({
                posts: json
            })
        })
    }
    addFriend=()=>{
        const API='/api/friends'

        const putData={
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                newFriend: this.state.user
            }),
            credentials:'include'
        }

        fetch(API, putData)
        .then((res)=>{
            this.getFriendsList()
        })
    }
    deleteFriend=()=>{
        const API='/api/friends'

        const deleteData={
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify({
                deleteFriend: this.state.user
            }),
            credentials:'include'
        }

        fetch(API, deleteData)
        .then((res)=>{
            this.getFriendsList()
        })
    }

    render(){
        if(this.state.load){
            return <Loading/>
        } else{
            return(
                <Fragment>
                    <h1>{this.state.user}</h1>
    
                    {this.state.button}
                    <table className='card m-3 p-1 m-3'style={{
                            float: 'none',
                            width: '55vw'
                        }}>
                            <tbody>
                            {this.state.posts.map((post)=>{
                                return(
                                    <tr className='p-2 card m-1'key={post._id}>
                                        <td className='card-header bg-dark text-light mb-1'>{post.userId}</td>
                                        <td className='p-1 m-1 mt-0'><small>{post.creation}</small></td>
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