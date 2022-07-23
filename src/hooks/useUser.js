import axios from 'axios';
import { getCookie } from '../utils/cookies';

export default function useUser() {

    const getAllUsers = async () => {
        try {
            const users = await axios.get('/user/all?token='+getCookie('token'));
            return users.data.users;
        } catch(err) {
            console.log(err);
            return null;
            //throw new Error('Упс, что-то пошло не так...');
        }
    }

    const createUser = async (userData) => {
        try {
            const res = await axios.post(('/auth/signup?token='+getCookie('token')) , userData);
            return res.data;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
    const deleteUser = async (id) => {
        try {
            const res = await axios.post('/user/remove', {
                userID : id,
                token:getCookie('token')
            });
            return res;
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    return {
        getAllUsers,
        deleteUser,
        createUser
    }
}
