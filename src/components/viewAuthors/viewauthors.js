import axios from 'axios';
import React, { Component } from 'react'

let initialState ={
    authors:[]
}

export default class viewauthors extends Component {
    constructor(props){
        super(props);
        this.state = initialState
    }
    componentDidMount(){
        axios.get("http://localhost:8000/author")
        .then((response)=>{
            console.log(response.data.data);
            this.setState({authors:response.data.data})
        })
    }
    render() {
        return (
            <div className="container">
                <h2>Authors</h2>
                {this.state.authors.length>0 && this.state.authors.map((item,index)=>(
                    <div class="shadow p-3 m-3 bg-white rounded" key={index}>
                        <h4>Name : {item.firstName+" "+item.lastName}</h4>
                        <h4>Nationality : {item.nationality}</h4>
                    </div>
                ))}
                
            </div>
        )
    }
}
