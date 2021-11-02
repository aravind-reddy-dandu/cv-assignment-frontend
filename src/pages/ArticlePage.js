import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import LoadingPage from './Loading';
import EditableText from "../components/EditableText";

const ArticlePage = ({ match }) => {
    const id = parseInt(match.params.name);
    const username = 'test'

    const [articlesContent, setarticlesContent] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articlescontent/`);
            const body = await result.json();
            setarticlesContent(body);
        }
        fetchData();
    });

    const article = articlesContent.find(article => article.id === id);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${id}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    }, [id]);

    const handleArticleEdit = async (value) => {
        const result = await fetch(`/api/articles/${id}/update-post`, {
            method: 'post',
            body: JSON.stringify({ username, text: value }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        setarticlesContent(body);
    }

    if (!article) return <LoadingPage />

    const otherArticles = articlesContent.filter(article => article.id !== id);

    return (
        <>
            <h1>{article.title}</h1>
            <UpvotesSection articleId={id} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            <EditableText text={article.content} handleArticleEdit = {handleArticleEdit}/>
            {/* {article.content.map((paragraph, key) => (

                // <input
                // style={{ width: "100%", height :'50px', fontSize : '20px' }}
                //     type="text"
                //     value={paragraph}
                //     onChange={e => handleInputChange(e)}
                // />

                
            ))} */}
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleId={id} setArticleInfo={setArticleInfo} />
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;