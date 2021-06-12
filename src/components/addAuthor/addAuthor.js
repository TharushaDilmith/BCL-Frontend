import axios from "axios";
import React, { Component } from "react";

let initialState ={
    firstName:" ",
    lastName:" ",
    nationality:" "
}
export default class addAuthor extends Component {
  constructor(props) {
    super(props);
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.state=initialState;
  }

  onChange(e){
      this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
      e.preventDefault();
      let author ={
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          nationality:this.state.nationality
      }
      

      axios.post('http://localhost:8000/author/add/',author)
      .then((response)=>{
          alert('Data inserted');
      })
      .catch((error)=>{
          alert('Insert error');
          console.log({error:error.message});
      })
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label for="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label for="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
              name="lastName"
            />
          </div>
          <div className="mb-3">
            <label for="nationality" className="form-label">
              Nationality
            </label>
            <input
              type="text"
              className="form-control"
              id="nationality"
              name="nationality"
              value={this.state.nationality}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
