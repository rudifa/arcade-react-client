import React, { Component } from "react";
import "./App.css";

import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      title
      rating
      author
    }
  }
`;


class Book extends Component {
  constructor() {
    super();
    this.state = { details: false };
  }

  render() {
    const { book } = this.props;
    const toggleDetails = () => {
      this.setState({ details: !this.state.details });
    };

    return (
      <div>
        <br />
        <h3 className="Card--name">{book.title} </h3>
        <button onClick={toggleDetails}>
          {this.state.details ? "<" : ">"}
        </button>
        {this.state.details && (
          <>
            <p>by {book.author}</p>
            <p>Rating {book.rating}</p>
          </>
        )}
      </div>
    );
  }
}

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (error) {
    console.error("***", error);
  return <h1>Error: {error["message"]}! </h1>;
  }
  if (loading) return <h1>Loading...</h1>;

  return (
    <main className="App">
      <h1>D-Arcade Books</h1>
      {data.books.map((book) => (
        <div>
          {/*<Book key={book.author} book={book} />*/}
          <Book key={book.author} book={book} />
        </div>
      ))}
    </main>
  );
}

export default App;
