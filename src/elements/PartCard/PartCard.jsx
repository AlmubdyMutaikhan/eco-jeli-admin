import Button from "../Button/Button";

const PartCard = ({fname, sname, email,role, phone, editMode, deletePrt, id, removePrt}) => {
    return (
        <div className='participant-card'>
                            <h3 style={{
                                color:'#75a20b'
                            }}>{fname} {sname}</h3>
                            <br/>
                            <p style={{
                                fontWeight:'bold'
                            }}>Контакты:</p>
                            <br/>
                            <div className='contacts'>
                                <p>email: {email}</p>
                                <p>phone: {phone}</p>
                                <p>role: {role}</p>
                            </div>
                         <Button text={'Удалить'} style={{
                                        color:'white',
                                        fontWeight:'bold',
                                        background:'red',
                                        width:'30%',
                                        marginLeft:'70%'
                                
                           }}
                           onClick={() => {
                            removePrt(id);
                           }}
                           />
                        </div>
    )
}

export default PartCard;