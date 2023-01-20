import React, { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import reviewService from '../../services/reviews'
import BookList from '../BookList'

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([{ title: "title", author: "author" }])

  const handleChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
    console.log(e.target.value)
  }

  //Submit Query and show results
  const handleSubmit = (e) => {
    e.preventDefault()
    reviewService.query(query).then(results => {
      //setResults(results)
      console.log(results.docs[0].key)
      console.log(results.docs[0].cover_i)
      console.log(results.docs[0].title)
      console.log(results.docs[0].author_name[0])

      setResults([{
        title: results.docs[0].title, 
        author: results.docs[0].author_name[0]
      }])




    })
  }

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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>

      <BookList books={results} />
    </div>

  )
}

export default Home