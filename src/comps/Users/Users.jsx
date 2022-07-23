import { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';

import './Users.css';
import EditPartCard from '../../elements/PartCard/EditPartCard';

import PartCard from '../../elements/PartCard/PartCard';
const Users = () => {
    const {getAllUsers, deleteUser, createUser} = useUser();
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const users =  await getAllUsers();
        setUsers(users);
        
    }

    const addUser = async (body) => {
        const user = await createUser(body);
        if(user) {
            alert('Email: '+user.email + '\nPassword:'+user.pwd+
            '\nСкиньте эти данные вашему пользователю, в случае неверного вы можете его удалить и заново создать.');
        } else {
            alert('Error | Access problem')
        }
    }

    const removeUser = async (id) => {
        const res = await deleteUser(id);
        console.log(res);
        if(res) {
           window.location.reload('/'); 
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="user-panel-container">
            <h1>Users</h1>
            <br/>
            <EditPartCard addUsser={addUser}/>
            <br/>
            {users.map((user, key) => {
                return <PartCard
                    fname={user.fname}
                    sname={user.sname}
                    role={user.role}
                    email={user.email}
                    phone={user.phone}
                    key={key}
                    id={user._id}
                    removePrt={removeUser}
                />
            })}
        </div>
    )
}

export default Users;