import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>
        home
      </Link>
      <Link to="/reviews" style={padding}>
        reviews
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
      <Link to="/my_reviews" style={padding}>
        my reviews
      </Link>
    </div>
  )
}

export default Menu