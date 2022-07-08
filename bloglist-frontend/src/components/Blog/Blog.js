import { useState } from "react";
import "./Blog.css";

const Blog = ({blog, update, username, del}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown(!shown);

  const likeHandler = () => update(blog);

  const showDelete = () => {
    if(blog.user && blog.user.username === username) return true;
    return false;
  }

  const showDetails = () => (
    <div className="blog">
      {blog.title} <button onClick={toggleShown}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={likeHandler}>like</button><br /> 
      {blog.author} <br />
      {
        showDelete() ? <button 
        className="btn-del"
        onClick={() => {
          const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
          if(confirm) del(blog.id);
          return;
        }}
      >delete</button> : null}
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