import { useState } from "react";
import "./Blog.css";

const Blog = ({blog}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown(!shown);

  const showDetails = () => (
    <div className="blog">
      {blog.title} <button onClick={toggleShown}>hide</button> <br />
      {blog.url} <br />
      {blog.likes} <br /> 
      {blog.author} <br />
    </div>
  )

  return (
    shown
      ? showDetails()
      : <div className="blog">
          {blog.title} by {blog.author} <button onClick={toggleShown}>show</button>
        </div> 
  )
}

export default Blog