import { useState } from "react";
import PropTypes from "prop-types";
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
      <p className=".title">{blog.title} <button onClick={toggleShown}>hide</button></p>
      <p className=".url">{blog.url}</p>
      <p className=".likes">likes {blog.likes} <button className="like-btn" onClick={() => update(blog)}>like</button></p>
      <p className=".author">{blog.author}</p>
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
          {blog.title} by {blog.author} <button className="show-btn" onClick={toggleShown}>show</button>
        </div> 
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  del: PropTypes.func.isRequired

}

export default Blog