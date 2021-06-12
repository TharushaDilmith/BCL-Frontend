import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";

let initialState = {
  bookName: " ",
  isbn: " ",
  author: " ",
  price: 0,
  yearOfPublication: 0,
  publisher: " ",
  options: [],
  authors: [],
  selectedAuthor: " ",
};
export default class updateBook extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onAuthorSelect = this.onAuthorSelect.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  componentDidMount(e) {
    axios
      .get("http://localhost:8000/book/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ bookName: response.data.data.name });
        this.setState({ isbn: response.data.data.ISBN });
        this.setState({ price: response.data.data.price });
        this.setState({
          yearOfPublication: response.data.data.yearOfPublication,
        });
        this.setState({ publisher: response.data.data.publisher });
      });

    axios.get("http://localhost:8000/author/").then((response) => {
      this.setState({ authors: response.data.data });
      let data = [];
      this.state.authors.map((item) => {
        let author = {
          value: item._id,
          label: item.firstName + " " + item.lastName,
        };
        data.push(author);
      });
      this.setState({ options: data });
    });
  }
  onAuthorSelect(e) {
    this.setState({ selectedAuthor: e ? e.label : " " });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault()
    let book = {
      name: this.state.bookName,
      ISBN: this.state.isbn,
      author: this.state.selectedAuthor,
      price: this.state.price,
      yearOfPublication: this.state.yearOfPublication,
      publisher: this.state.publisher,
    };
    
    axios.put("http://localhost:8000/book/update/"+this.props.match.params.id,book)
    .then((response)=>{
        alert("Data updated");
        location.reload();
    })
    .catch((error)=>{
        alert("Update error");
        console.log({error:error.message});
    })
  }

  render() {
    return (
      <div>
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
              ></Select>
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
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
