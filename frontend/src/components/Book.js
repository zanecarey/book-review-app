import { useState } from 'react'

const Book = ({ title, author, id, cover }) => {


    return (
        <div>
            <div>
                {title} by {author} 
            </div>
            <img src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`} alt="placeholder" />
            {/* <img src={`https://covers.openlibrary.org/b/id/9165528-L.jpg`} alt="placeholder" /> */}
        </div>
    )
}

export default Book