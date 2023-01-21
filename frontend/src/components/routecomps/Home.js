import React, { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import reviewService from '../../services/reviews'
import BookList from '../BookList'
import useMatch from 'react-router-dom'

const Home = ({results, submitQuery, handleChange}) => {
  // const [query, setQuery] = useState('')
  // const [results, setResults] = useState([{ title: "title", author: "author" }])

  // const handleChange = (e) => {
  //   e.preventDefault()
  //   setQuery(e.target.value)
  //   console.log(e.target.value)
  // }

  // //Submit Query and show results
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   reviewService.query(query).then(results => {

  //     const arr = []
  //     for (let i = 0; i < 10; i++) {
  //       arr.push({
  //         title: results.docs[i].title,
  //         author: results.docs[i].author_name[0],
  //         cover: results.docs[i].cover_i,
  //         book_key: results.docs[i].key.slice[7]
  //       })
  //       console.log(results.docs[i].cover_i)
  //     }

  //     setResults(arr)
  //   })
  // }

  

  return (
    <div>
      <Form>
        <Form.Group className="book-search" controlId="formSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a work, author, or subject"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitQuery}>
          Submit
        </Button>
      </Form>

      <BookList books={results} />
    </div>

  )
}

export default Home