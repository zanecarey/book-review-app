import { useState } from 'react'

const Book = ({ title, author, id }) => {


    return (
        <div>
            <div>
                {title} by {author} 
            </div>
        </div>
    )
}

export default Book