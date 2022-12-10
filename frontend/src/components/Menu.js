import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
      <Link to="/reviews" style={padding}>
        reviews
      </Link>
      <Link to="/create_new" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
    )
  }

export default Menu