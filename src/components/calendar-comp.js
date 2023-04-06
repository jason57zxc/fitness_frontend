import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Calendar } from 'primereact/calendar';
import Common from '../common.js'

//import { Calendar } from '@bit/primefaces.primereact.calendar';
//import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';

const CalendarComp = (props) => {

    const { date, setDate, getMonthData, data } = props


    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://unpkg.com/primereact/core/core.min.js";
    //     script.async = true;
    //     document.body.appendChild(script);

    //     const script2 = document.createElement("script");
    //     script2.src = "https://unpkg.com/primereact/calendar/calendar.min.js";
    //     script2.async = true;
    //     document.body.appendChild(script2);
    // }, []);

    let month = date.getMonth();
    let year = date.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [viewDate, setViewDate] = useState(null);
    const [recordDates, setRecordDates] = useState([]);

    const onHandleViewDateChange = (e) => {
        setViewDate(e.value)
        setDate(e.value)
    }

    useEffect(() => {
        getMonthData()
    }, [viewDate])

    useEffect(() => {
        let records = data.map(i => {
            return i.date
        })
        setRecordDates(records)
    }, [data])

    const dateTemplate = (date) => {
        if (recordDates.includes(Common.getDateFormat(new Date(date.year, date.month, date.day)))) {
            return (
                // <div style={{ backgroundColor: '#1dcbb3', color: '#ffffff', fontWeight: 'bold', borderRadius: '50%' }}>{date.day}</div>
                <div className='w-full h-full flex justify-center items-center rounded-full bg-rose-300 text-white'>
                    {date.day}
                </div>
            );
        }
        else {
            return date.day;
        }
    }

    return (
        <div>
            <Calendar
                className="w-full"
                panelClassName='border-0 p-0'
                inline
                value={date}
                onChange={(e) => setDate(e.value)}
                viewDate={viewDate}
                onViewDateChange={onHandleViewDateChange}
                dateTemplate={dateTemplate}
            >
            </Calendar>
        </div>
    );
}

export default CalendarComp