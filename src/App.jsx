import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Select from "react-select";
import addAuthor from "./components/addAuthor/addAuthor";
import createBook from "./components/addBook/addBook";
import bookPriceCalculation from "./components/bookPriceCalculation/bookPriceCalculation";
import NavBar from "./components/navBar/navBar";
import updateBook from "./components/updateBook/updateBook";
import viewauthors from "./components/viewAuthors/viewauthors";
import viewBooks from "./components/viewBooks/viewBooks";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <section>
              <Switch>
                  <Route path="/add-book"component={createBook}></Route>
                  <Route path="/view-books"component={viewBooks}></Route>
                  <Route path="/view-authors"component={viewauthors}></Route>
                  <Route path="/add-author" component={addAuthor}></Route>
                  <Route path ="/price-calculate" component={bookPriceCalculation}></Route>
                  <Route path="/book-update/:id"component={updateBook}></Route>
              </Switch>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}
