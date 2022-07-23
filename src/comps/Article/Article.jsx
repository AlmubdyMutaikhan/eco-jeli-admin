import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../elements/Button/Button';
import './Article.css';

const Article = ({title, text, date, avatar, desc, id, removeArticle}) => {
    
    return (
        <div className="article-container">
            
            <div className='article-title-cont'>
                {title}
            </div>
            <div className='news-credits underlined' style={{
                display:'flex',
                alignItems:'center',
                width:'15%',
                paddingTop:'25px'
            }}>
                    <img src={'https://cdn1.iconfinder.com/data/icons/office-322/24/time-date-schedule-event-calendar-appointment-128.png'} alt="date"
                    />
                    <p>{date.slice(0, 10)}</p>
            </div>
            <div className='article-avatar-cont'>
                <img src={avatar}
                alt="article photo" />
            </div>
            <div className='article-text-cont'> 
            <details>
<summary>Описание статьи</summary>
<p>{desc}</p></details>
            </div>

            <div className='article-text-cont'> 
            <details>
<summary>Текст статьи</summary>
<p>{text}</p></details>
            </div>
            <div className='article-author-cont'>
                Автор : <span>
                    Администрация Eco-Jeli
                    </span>
            </div>
            <Button text={'Удалить новость'}
                onClick={() => {
                    removeArticle(id);
                }}
            />
        </div>
    )
}

export default Article;