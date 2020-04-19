import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../styles.css";
import details from "./details";

import axios from "axios";

export default function Home() {
  const [book, setBook] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [apiKey, setApiKey] = React.useState(
    "AIzaSyAz58YCnHUXfgr9qt-IacyDRMoxBGiLglY"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <main>
      <Switch>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1> Book search app using google books API </h1>

            <Route path="/details" component={details} />

            <div className="form-group">
              <input
                onChange={handleChange}
                type="text"
                className="form-control mt-20"
                placeholder="Enter the book's name"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {result.map(book => (
            <div className="col-md-12 row">
              <br />
              <div className="col-sm-2">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="col-sm-4">
                <p>
                  Author: {book.volumeInfo.authors}
                  <br />
                  Title: {book.volumeInfo.title}
                  <br />
                  Publisher: {book.volumeInfo.publisher}
                </p>

                <Link to="/details">
                  <button type="button" className="btn btn-success">
                    More info
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Switch>
    </main>
  );
}
