import React, {Component} from 'react'

export default class Alert extends Component{
    render(){
        return(
            <div style= {this.props.style} className="alert alert-dismissible alert-danger">
                <button type="button" className='close'onClick={this.props.func}>&times;</button>
                <h4 className="alert-heading"> {this.props.title} </h4>
                <p className="mb-0"> {this.props.content} </p>
            </div>
        )
    }
}