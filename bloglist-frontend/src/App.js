import { useState, useEffect } from 'react';
import Blog from './components/Blog/Blog';
import blogService from './services/blogs';
import loginService from "./services/login";
import NewBlog from "./components/NewBlog/NewBlog";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsernaem] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("bloglistLoggedUser");
    if(user) {
      const parsed = JSON.parse(user);
      setUser(parsed);
      blogService.setToken(parsed.token);
    }
  }, [])

  const handleLogin = async e => {
    try {
      e.preventDefault();

      const user = await loginService.login({username, password});

      window.localStorage.setItem("bloglistLoggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsernaem("");
      setPassword("");
    }
    catch(err) {
      const msg = err.response.data;
      setMessage({text: msg, error: true});
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    }
  }

  const creationHandler = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create({title, author, url});
      setBlogs(blogs.concat(blog));

      const text = {error: `a new blog ${title} is created by ${author}`}
      setMessage({text, error: false})
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    }
    catch(err) {
      console.log(err.message);
    }
  }
  
  const showMessage = () => {
    let result = null;
    result = message === null ? null : <Notification message={message} />
    return result;
  }

  const showBlogs = () => {
    return <div>
      <h2>blogs</h2>
      {showMessage()}
      <p>{user.name} logged in <button
        onClick={() => {
          setUser(null);
          window.localStorage.clear();
        }}
      >logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h2>create new</h2>
      <NewBlog
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        creationHandler={creationHandler}
      />
    </div>

  }

  const showLogin = () => (
      <>
        <h2>Login to Application</h2>
        {showMessage()}
        <form onSubmit={handleLogin}>
          <div>
            username <input
              type="text"
              name="username"
              value={username}
              onChange={({target}) => setUsernaem(target.value)}
            />
          </div>
          <div>
            password <input
              type="password"
              name="password"
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </>
    );

  return (
    <>
      {user === null && showLogin()}
      {user !== null && showBlogs()}
    </>
  )
}

export default App
