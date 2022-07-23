
import { Link as NavLink } from 'react-router-dom';


import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import { getCookie } from '../../utils/cookies';
import { useEffect, useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
const Navbar = () => {
    const [text, setText] = useState([
        {
            lang:'KZ',
            menu:{
                about:'',
                calendar:'',
                login:'',
            }            
        },
        {
            lang:'RU',
            menu:{
                about:'Users',
                calendar:'Events',
                login:'News',
            }            
        }
    ])


    const [name, setName] = useState('Loading...');
    const {signoutUser, isAuthenticated} = useAuth();
    
    const loadData = async () => {
        try {
            const user = await isAuthenticated();
            //console.log(user);
            if(user.status && user.payload) {
                setName(user.payload.user.fname + ' ' + user.payload.user.sname);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
                 <div className='navbar-logo-container'>
                    <img src={require('../../media/logo.png')}
                         alt="logo"
                        
                    />
                    <NavLink to='/'>
                        <h1>Eco Jeli</h1>
                    </NavLink>
                 
                 </div>
                 <div className='navbar-items-container'>

                    <div className='navbar-item'>
                        <Link activeClass="active" to="/">
                      
                            {text[1].menu.about}
                          
                        </Link>
                    </div>
                
                    <div className='navbar-item'>
                        <Link activeClass="active" to="events" spy={true} offset={-50} smooth={true}>
                          
                                {text[1].menu.calendar}
                             
                        </Link>
                    </div>
                    <div className='navbar-item'>
                        {getCookie('auth') && getCookie('token').length > 190 &&
                            <Link activeClass="active" to="/news" spy={true} offset={-70} smooth={true}>
                     
                                News
                      
                        </Link>

                        }
                        {!getCookie('auth') &&
                        <Link activeClass="active" to="login" spy={true} offset={-70} smooth={true}>
                      
                                {text[1].menu.login}
                          
                        </Link>
                        }
                    </div>
                 
                        {getCookie('auth') && getCookie('token').length > 190 &&
                            <div className='user-auth-show'>
                                <p style={{
                                    marginLeft:'20px',
                                    paddingBottom:'5px',
                                    borderBottom:'3px solid #75a20b'
                                }}>{name}</p>
                                <img src='https://cdn3.iconfinder.com/data/icons/material-line-thin/1024/enter-128.png'
                                style={{
                                    cursor:'pointer',
                                    height:'50px',
                                    width:'45px',
                                    marginLeft:'30px'
                                    
                                }}
                                onClick={signoutUser}
                            alt="logout"/>
                            </div>
                            
                        }
                   
                 </div>


            </div>
        </div>
    )
}

export default Navbar;