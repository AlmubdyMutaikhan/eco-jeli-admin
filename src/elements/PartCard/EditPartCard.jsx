import { useState } from "react";
import Button from "../Button/Button";

const EditPartCard = ({addUsser}) => {
    const [fname, setFName] = useState('');
    const [sname, setSName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('');
    const [role, setRole] = useState('u');

    const getUser = () => {
        const user = {fname, sname, email, password};
        if(role === 'u' || role=='leader') {
            user.userType='leader';
        } else {
            user.userType='admin';
        }

        return user;
    }

    return (
        <div className='participant-card'>
                        <h3>Создание пользователя</h3>
                            <br/>
                            <p style={{
                                fontWeight:'bold'
                            }}>ФИО:</p>
                            <br/>
                            <input type={'text'} required 
                                onChange={(e) => {
                                    setFName(e.target.value);
                                }}
                                placeholder="Имя"/>
                            <br/>
                            <input type={'text'}
                                    onChange={
                                        (e) => {
                                            setSName(e.target.value)
                                        }
                                    }
                                    placeholder="Фамилия"/>
                            <br/>
                            <p style={{
                                fontWeight:'bold'
                            }}>Контакты:</p>
                            <br/>
                            <div className='contacts'>
                                <input type={'text'} required 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                placeholder="e-mail"/>
                                <br/>

                                <input type={'text'} 
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                style={{
                                    marginTop:'15px'
                                }} placeholder="придумайте пароль для юзера..."/>
                            </div>
                            <br/>
                            <p style={{
                                fontWeight:'bold'
                            }}>Роль:</p>
                            <br/>
                            <select className='select' onChange={(e) => {
                                setRole(e.target.value);
                            }}
                            value={role}
                            >
                                    <option value='u'>Выберите роль</option>
                                    <option value='admin'>Админ</option>
                                    <option value='leader'>Лидер</option>
                            </select>

                            

                            <br/>
                            <Button text={'Добавить'}
                                    onClick={() => {
                                        const user = getUser();
                                        addUsser(user);
                                        
                                    }}
                                    style={{
                                        color:'white',
                                        fontWeight:'bold'
                                    }}
                                    />
                        </div>
    )
}

export default EditPartCard;