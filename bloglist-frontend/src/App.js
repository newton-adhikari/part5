import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsernaem] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    }
  }, [])

  const handleLogin = async e => {
    try {
      e.preventDefault();

      const user = await loginService.login({username, password});

      window.localStorage.setItem("bloglistLoggedUser", JSON.stringify(user));
      setUser(user);
      setUsernaem("");
      setPassword("");
    }
    catch(e) {
      console.log(e.response.data);
    }
  }

  const showBlogs = () => {
    return <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button
        onClick={() => {
          setUser(null);
          window.localStorage.clear();
        }}
      >logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  }

  const showLogin = () => (
      <>
        <h2>Login to Application</h2>
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
