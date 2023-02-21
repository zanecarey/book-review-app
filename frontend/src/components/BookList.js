import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

const BookList = ({ books }) => (
  <div>
    {books.length !== 0 && <h2>Results</h2> }
    <ul>
      {books?.map((book) => (
        <li key={book.id}>
          {/* <Link to={`/books/${book.id}`}>{<Book key={book.id} title={book.title} author={book.author}/>}</Link> */}
          <Link to={`/books/${book.book_key}`}>{<Book key={book.id} book={book}/>}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default BookList
