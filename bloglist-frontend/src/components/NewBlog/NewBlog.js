import { useState } from "react";
import PropTypes from "prop-types";

const NewBlog = ({creationHandler}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const create = (ev) => {
        ev.preventDefault();
        creationHandler({title, author, url});

        setTitle("");
        setAuthor("");
        setUrl("");
    }

    return <form onSubmit={create}>
        <div>title: <input
            type="text"
            name="title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
        />
        </div>
        <div>author:<input
            type="text"
            name="author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
        />
        </div>
        <div>url:<input
            type="text"
            name="url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
        />
        </div>
        <button type="submit">create</button>
    </form>
}

NewBlog.propTypes = {
    creationHandler: PropTypes.func.isRequired
}

export default NewBlog;