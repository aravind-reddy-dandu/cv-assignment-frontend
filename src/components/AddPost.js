import React, { useState } from 'react';

const AddPostForm = ({ setarticlesContent }) => {
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');

    const addPost = async () => {
        const result = await fetch(`/api/articles/add-post`, {
            method: 'post',
            body: JSON.stringify({ title: title, text: postText }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        setarticlesContent(body);
        setTitle('');
        setPostText('');
    }

    return (
        <div style = {{display : 'table', margin : '0 auto'}} id="add-comment-form">
            <h3>Make a Post</h3>
            <label>
                Title:
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
                Post:
                <textarea rows="4" cols="50" value={postText} onChange={(event) => setPostText(event.target.value)} />
            </label>
            <button onClick={() => addPost()}>Add Post</button>
        </div>
    );
}

export default AddPostForm;