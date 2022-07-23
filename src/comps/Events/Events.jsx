import { useEffect, useState } from 'react';
import EventCard from '../../elements/EventCard/EventCard';
import EventCardEdit from '../../elements/EventCardEdit/EventCard';
import useEvent from '../../hooks/useEvent';
import './Events.css';

const Events = () => {
    const {getAllEvents} = useEvent();
    const [events, setEvents] = useState([]);

    const loadEvents = async () => {
        const events = await getAllEvents();
        if(!events) {
            alert('Can not load events!Try again!');
        } else {
            setEvents(events);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return(
        <div className='event-container'>
            <EventCardEdit/>
            {events.map((event, key) => {
                return <EventCard
                    title={event.name}
                    date={event.date}
                    id={event._id}
                    avatar={event.avatar}
                    link={event.link}
                />
            })}
        </div>
    )
}

export default Events;