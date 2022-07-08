import { useState } from "react";
import "./Blog.css";

const Blog = ({blog, update}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown(!shown);

  const likeHandler = () => update(blog);

  const showDetails = () => (
    <div className="blog">
      {blog.title} <button onClick={toggleShown}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={likeHandler}>like</button><br /> 
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