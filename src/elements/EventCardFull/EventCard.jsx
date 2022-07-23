import useEvent from '../../hooks/useEvent';
import Button from '../Button/Button';
import './EventCard.css';

const EventCardFull = ({title, date, id, avatar, link}) => {
    const {removeEvent} = useEvent();

    const deleteEvent = async () => {
        const res = await removeEvent(id);
        console.log(res);
        alert('Удалено успешно')
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    return (
        <div className="event-card">
            <div className="event-title">
                <h3>{title}</h3>
                <div className='news-credits top-left-radius' style={{
                    display:'flex',
                    alignItems:'center',
                    marginTop:'10px'
                }}>
                    <img src={'https://cdn1.iconfinder.com/data/icons/office-322/24/time-date-schedule-event-calendar-appointment-128.png'} alt="date"
                    />
                    <p>{date.slice(0, 10)}</p>
                </div>
                <Button text={'Ссылка на регу'}  onClick={() => {
                    window.open(link);
                }} />
                <br/>
                <Button text={'Удалить этот ивент'} onClick={deleteEvent}/>
            </div>
            <div className='event-photo'>
                <img src={avatar} />
            </div>
           
        </div>
    )
}

export default EventCardFull;