import { useEffect, useState } from 'react';
import useNews from '../../hooks/useNews';
import Article from '../Article/Article';
import EditNews from '../EditNews/EditNews';
import './News.css';

const News = () => {
    const {getNews, deleteNewsOne} = useNews();
    const [news, setNews] = useState([]);

    const loadNews = async () => {
        const newss = await getNews();
        if(newss) {
            console.log(newss);
            setNews(newss);
        }
    }
    

    useEffect(() => {
        loadNews();
    }, []);


    const removeArticle = async (id) => {
        const res = await deleteNewsOne(id);
        if(res === 'ok') {
            alert('Успешно удалили новость');
            window.location.reload();
        }
    }

    return (
        <div className="news-container">
            <h1>Все новости/статьи</h1>
            <EditNews/>
            {news.map((n, key) => {
                return <Article text={n.text} 
                    title={n.title}
                    desc={n.desc}
                    avatar={n.avatar}
                    date={n.date}
                    key={key}
                    id={n._id}
                    removeArticle={removeArticle}
                />
            })}
        </div>
    )
}

export default News;