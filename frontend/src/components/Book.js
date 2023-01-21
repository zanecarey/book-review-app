import { useState } from 'react'

const Book = ({ book }) => {


    return (
        <div>
            <div>
                {book.title} by {book.author} 
            </div>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt="placeholder" />
            {/* <img src={`https://covers.openlibrary.org/b/id/9165528-L.jpg`} alt="placeholder" /> */}
        </div>
    )
}

export default Book