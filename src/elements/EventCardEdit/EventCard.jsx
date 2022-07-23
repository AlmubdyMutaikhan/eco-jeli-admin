import { useState } from 'react';
import Button from '../Button/Button';
import './EventCard.css';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import useEvent from '../../hooks/useEvent';

const EventCardEdit = () => {
    const {addEvent} = useEvent();
    const [logoFile, setLogoFile] = useState(null);
    const [logo, setLogo] = useState('');

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const createEvent = async () => {

        const res = await addEvent({
            name,
            desc,
            date,
            link,
            avatar:localStorage.getItem('img')
        });

        console.log(res);
        setLoading(false);
        alert('event added succesfully');
        //console.log({logoFile, name, date, desc, link});
    }

    const uploadEvent = () => {
        const storageRef = ref(storage, `/news/news-${name}.jpg`);
            const uploadTask = uploadBytesResumable(storageRef, logoFile);
            setLoading(true);
            uploadTask.on("state_changed", 
                () => {},
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then(res => {
                        localStorage.setItem('img', res);
                        createEvent();
                })
            });
    }

    
    const fileHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setLogo(objectUrl);
        setLogoFile(file);
    }




    return (
        <div className="event-card" style={{
            display:'flex',
            flexDirection:'column'
        }}>
            <h1>Add event</h1>
            {loading && <h3>Подождите, данные отправляются</h3>}
            <input type="text" placeholder='Event name..' onChange={(e) => {
                setName(e.target.value);
            }}/>
            <br/>
            <textarea style={{
                maxWidth:'500px'
            }} placeholder='Event desc/additional info, suggest to write place and time here :D'
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            >

            </textarea>
            <br/>
            <input type="date" placeholder='Event name..' onChange={(e)=>{
                setDate(e.target.value);
            }}/>
            <br/>
            <input type="text" placeholder='Event link google forms..' onChange={(e)=>{
                setLink(e.target.value);
            }} />
            <input type='file' className='avatar-file-submit' onChange={fileHandler} />
            <img src={logo} alt="event"/>
            <Button text={'Add event'}
                onClick={uploadEvent}
            />
        </div>
    )
}

export default EventCardEdit;