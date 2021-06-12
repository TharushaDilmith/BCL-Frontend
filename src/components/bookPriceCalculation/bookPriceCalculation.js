import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";

let initialState = {
  options: [],
  amount: 0,
  books: [],
  selectedBooks: [],
};

export default class bookPriceCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onBookSelect = this.onBookSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/book").then((response) => {
      this.setState({ books: response.data.data });
      let data = [];
      this.state.books.map((item) => {
        let book = {
          value: item._id,
          label: item.name,
        };
        data.push(book);
      });
      this.setState({ options: data });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onBookSelect(e) {
    this.setState({ selectedBooks: e ? e.map((item) => item.value) : [] });
  }
  onSubmit(e) {
    e.preventDefault();
    let booksID = {
      book: this.state.selectedBooks,
    };
    axios
      .post("http://localhost:8000/book/calculate/", booksID)
      .then((response) => {
        this.setState({ amount: response.data.data });
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label for="author" className="form-label">
              Books
            </label>
            <Select
              onChange={this.onBookSelect}
              options={this.state.options}
              className="basic-multi-select"
              isMulti
            ></Select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mb-3">
            <label for="amount" className="form-label">
              Amount
            </label>
            <input
              type="Number"
              className="form-control"
              id="amount"
              name="amount"
              value={this.state.amount}
              onChange={this.onChange}
              disabled
            />
          </div>
        </form>
      </div>
    );
  }
}
