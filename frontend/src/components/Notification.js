import React from "react";

const Notification = ({ data }) => {
    if (data.message === null) {
      return null
    }
  
    return (
      <div className={data.type}>
        {data.message}
      </div>
    )
  }
  
  export default Notification