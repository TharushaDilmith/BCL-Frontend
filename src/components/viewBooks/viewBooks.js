import axios from "axios";
import React, { Component } from "react";

let initialState = {
  books: [],
};

export default class viewBooks extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickNavigate = this.onClickNavigate.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/book").then((response) => {
      this.setState({ books: response.data.data });
    });
  }

  onClickNavigate(e, categoryID) {
    window.location = "book-update/" + categoryID;
  }

  onClickDelete(e, bookID) {
    try {
      axios
        .delete("http://localhost:8000/book/delete/" + bookID)
        .then((response) => {
          console.log(response.data);
          location.reload();
        });
    } catch (error) {
      console.log({ error: error.message });
    }
  }
  render() {
    return (
      <div className="container">
        <h2>Books</h2>
        {this.state.books.length > 0 &&
          this.state.books.map((item, index) => (
            <div className="shadow p-3 m-3 bg-white rounded" key={index}>
              <h4>Name : {item.name}</h4>
              <h4>ISBN : {item.ISBN}</h4>
              <h4>Author : {item.author}</h4>
              <h4>Price : {item.price}</h4>
              <h4>Year of publication : {item.yearOfPublication}</h4>
              <h4>Publisher : {item.publisher}</h4>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => this.onClickNavigate(e, item._id)}
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger m-2"
                onClick={(e) => this.onClickDelete(e, item._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    );
  }
}
