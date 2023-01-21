import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

const BookList = ({ books }) => (
  <div>
    <h2>Results</h2>
    <ul>
      {books?.map((book) => (
        <li key={book.id}>
          {/* <Link to={`/books/${book.id}`}>{<Book key={book.id} title={book.title} author={book.author}/>}</Link> */}
          <Book key={book.id} title={book.title} author={book.author} cover={book.cover}/>
        </li>
      ))}
    </ul>
  </div>
)

export default BookList
