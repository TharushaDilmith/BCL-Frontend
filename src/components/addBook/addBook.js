import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";


let initialState = {
  bookName: " ",
  isbn: " ",
  price: 0,
  yearOfPublication: 0,
  publisher: " ",
  selectAuthor:" ",
  authors:[],
  options :[],
  authorID:" ",
  getBook:[]
};


export default class createBook extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onAuthorSelect=this.onAuthorSelect.bind(this);
  }
  componentDidMount(){
    axios.get("http://localhost:8000/author/")
    .then((response)=>{
      this.setState({authors:response.data.data},()=>{
        let data =[];
        this.state.authors.map((item,index)=>{
          let author={
            value:item._id,
            label:item.firstName+" "+item.lastName
          }
          data.push(author);
        })
        this.setState({options:data});
      })
    })
    
  }
  onAuthorSelect(e){
    this.setState({selectAuthor:e?e.label:" "});
    this.setState({authorID:e?e.value:" "});
    
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault()
    let book ={
      name : this.state.bookName,
      ISBN : this.state.isbn,
      author: this.state.selectAuthor,
      price : this.state.price,
      yearOfPublication:this.state.yearOfPublication,
      publisher:this.state.publisher
    }
    console.log(book);


    axios.post("http://localhost:8000/book/add",book)
    .then((response)=>{
      alert("Data inserted");
      this.setState({getBook:response.data.data});

      let bookID={
        id : this.state.getBook._id
      }
      axios.put("http://localhost:8000/author/update/"+this.state.authorID,bookID)
      .then((response)=>{
        console.log("Author updated");
      })
      .catch((error)=>{
        console.log("Update error");
      })

    })
    .catch((error)=>{
      alert("Data insert error");
      console.log(error.message);
    })
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label for="bookName" className="form-label">
              Book name
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              name="bookName"
              value={this.state.bookName}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label for="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              value={this.state.isbn}
              onChange={this.onChange}
              name="isbn"
            />
          </div>
          <div className="mb-3">
            <label for="author" className="form-label">
              Author
            </label>
            <Select
            onChange={this.onAuthorSelect}
            options={this.state.options}
            className="basic-single"
           
            >
    

            </Select>
          </div>
          <div className="mb-3">
            <label for="price" className="form-label">
              Price
            </label>
            <input
              type="Number"
              className="form-control"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label for="yearOfPublication" className="form-label">
              Year of publication
            </label>
            <input
              type="Number"
              className="form-control"
              id="yearOfPublication"
              name="yearOfPublication"
              value={this.state.yearOfPublication}
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label for="publisher" className="form-label">
              Publisher
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              name="publisher"
              value={this.state.publisher}
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
