import axios from 'axios';
import { getCookie } from '../utils/cookies';

export default function useNews(setLoading, setMsg, setStatus) {
    const getNews = async () => {
        try {
            const blogs = await axios.get('/blog/all/blogs');
            return blogs.data.blogs;
        } catch(err) {
            return null;
        }
    }


    const postNews = async (body) => {
        try {
            const res = await axios.post(('/blog/new?token=' + getCookie('token')), body);
            alert('успшено создали новость');

            return res.data;
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    const getNewsOne = async (id) => {
        try {
            const blog = await axios.get('/blog/'+id);
            return blog.data.blog;
        } catch(err) {
            console.log(err);
            return null;
        }
    }


    const deleteNewsOne = async (id) => {
        try {
            await axios.delete('/blog/'+id + '?token='+getCookie('token'));
            return 'ok';
        } catch(err) {
            console.log(err);
            return null;
        }
    }
    return {
        getNews,
        getNewsOne,
        deleteNewsOne,
        postNews
    }
}
