import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesList = ({ setarticlesContent, articles }) => {

    const deletePost = async (id) => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/delete-post/${id}`);
            const body = await result.json();
            setarticlesContent(body);
        }
        fetchData();
    }

    return (
        <>
            {articles.map((article, key) => (
                <>
                    <div>
                        <Link className="article-list-item" key={key+1} to={`/article/${article.id}`}>
                            <h3 style={{ width: "50%", float: 'left' }}>{article.title}</h3>
                        </Link>
                        <button style={{ padding: "10px", float: 'right' }} onClick={() => deletePost(article.id)} >Delete Post</button>
                        <Link className="article-list-item" key={key} to={`/article/${article.id}`}>
                            <p>{article.content.substring(0, 150)}...</p>
                        </Link>
                    </div>
                </>
            ))}
        </>
    );
};

export default ArticlesList;