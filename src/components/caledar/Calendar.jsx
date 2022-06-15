// App.js
import './calendar.scss'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './App.css';

const Calendars = ({itemSM, dateBegin, setDateBegin, dateEnd, setDateEnd} ) => {
    const [date, setDate] = useState([new Date(), new Date()]);
    setDateBegin(`${date[0].getFullYear()}-${date[0].getMonth()+1}-${date[0].getDate()}`)
    setDateEnd(`${date[1].getFullYear()}-${date[1].getMonth()+1}-${date[1].getDate()}`) 
    return (
        <div className="app">
            <div className="calendar-container">
                {itemSM ? (
                    <Calendar/>
                ):(
                    <Calendar
                        onChange={setDate}
                        worth={date}
                        selectRange={true}
                    />
                )}
            </div>
            {!itemSM ? (
                <p className="text-center">
                    <span className="daring">Từ ngày:</span>{' '}
                    {`${date[0].getDate()}-${date[0].getMonth()+1}-${date[0].getFullYear()}`}
                    <br/>
                    <span className="daring">Đến ngày</span> {`${date[1].getDate()}-${date[1].getMonth()+1}-${date[1].getFullYear()}`}
                </p>
                ):(
                    <></>
                )}
             
        </div>
    );
}

export default Calendars;