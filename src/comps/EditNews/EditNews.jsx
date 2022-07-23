import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { useState, useEffect } from 'react';
import Button from '../../elements/Button/Button';
import useNews from '../../hooks/useNews';
const EditNews = () => {

    const [logoFile, setLogoFile] = useState(null);
    const [logo, setLogo] = useState('');
    const {postNews} = useNews();

    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [desc, setDesc] = useState('');

    const [loading, setLoading] = useState(false);
    const createNews = async () => {

        const res = await postNews({
            title:name,
            desc,
            text,
            avatar:localStorage.getItem('img'),
            author:'Администрация Eco-Jeli'
        });

        console.log(res);
        setLoading(false);
        alert('event added succesfully');
        
        //console.log({logoFile, name, date, desc, link});
    }

    const uploadNews = () => {
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
                        createNews();
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
            flexDirection:'column',
            width:'100%',
            height:'100%'
        }}>
            <h1>Add news</h1>
            {loading && <h3>Подождите, данные отправляются</h3>}
            <input type="text" placeholder='News name..' onChange={(e) => {
                setName(e.target.value);
            }}/>
            <br/>
            <textarea style={{
                maxWidth:'1000px',
                height:'200px',
            }} placeholder='News desc/additional info, max len 400 chars...'
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            >

            </textarea>
            <br/>
            
            <br/>

            <textarea style={{
                maxWidth:'1000px',
                height:'500px',
                marginBottom:'50px'
            }} placeholder='News text infinite length...'
                onChange={(e) => {
                    setText(e.target.value);
                }}
            >

            </textarea>
            
            <input type='file' className='avatar-file-submit' onChange={fileHandler} />
            <img src={logo} alt="event"/>
            <Button text={'Add news'}
                onClick={uploadNews}
            />
        </div>
    )
}

export default EditNews;