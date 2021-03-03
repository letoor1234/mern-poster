import React, {Component} from 'react'

export default class Loading extends Component{
    render(){
        const loaderStyle={
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3em',
            height: '3em',
            borderTop: 'solid 0.2em blue',
            borderRadius: '50%',
            animationName:'rotation',
            animationDuration: '.5s',
            animationIteraionCount: 'infinite',
        }
        return(
            <div id='loader' style={loaderStyle}>
            </div>
        )
    }
}