import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
// import articleContent from './article-content';
import AddPostForm from '../components/AddPost';


function ArticlesListPage() {
    const [articlesContent, setarticlesContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articlescontent/`);
            const body = await result.json();
            setarticlesContent(body);
        }
        fetchData();
    });
    return (
        <>
            <h1 >Posts</h1>
            <AddPostForm setarticlesContent={setarticlesContent} />
            <ArticlesList  setarticlesContent={setarticlesContent} articles={articlesContent} />
        </>)
}

export default ArticlesListPage;