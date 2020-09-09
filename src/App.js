import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql` {
  books { 
    title
    rating
    author
  }
}
`

const Book = ({ book: { title, author } }) => (
  <div className='Card'>
      <div>
        <br/>
        <h3 className='Card--name'>{title} </h3> by {author} 
      </div>
  </div>
)

function App() {
    const { loading, error, data } = useQuery(GET_BOOKS)

    if (error) {
      console.error("***", error);
      return <h1>Something went wrong!</h1>
    }
    if (loading) return <h1>Loading...</h1>

    return (
        <main className='App'>
            <h1>D-Arcade Books</h1>
            {data.books.map((book) => (
                <Book key={book.author} book={book} />
            ))}
        </main>
    )
}

export default App;
