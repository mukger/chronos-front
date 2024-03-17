import React, {useEffect, useState} from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { addDateAction, addActiveAction } from "../store/dateReducer";
import getNameMonth from "./getNameMonth";
import getNameEvent from "./getNameEvent";

import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import './One-small-month.css';

function monthFormated(date){
    let resArr = [undefined, undefined, undefined, undefined, undefined, undefined];
    const startDay = moment(date).startOf('month')._d.getDay() === 0 ? 7 : moment(date).startOf('month')._d.getDay(); 
    let finishDay = moment(date).endOf('month')._d.getDate()
    let totalCount = 1;
    let isStart = false;
    for(let i = 1; i < 7; i++){
        if(i !== 1 && !isStart){
            break;
        }
        resArr[i] = [];
        for(let j = 1; j < 8; j++){
            if(i === 1 && startDay === j){
                isStart = true;
            }
            
            if(isStart){
                resArr[i][j] = totalCount;
                totalCount++;
            }
            else{
                resArr[i][j] = '';
            }
            if(totalCount > finishDay){
                isStart = false;
            }
        }
    }
    return(resArr);
}


const OneSmallMonth = (props) => {
    const dispatch = useDispatch();
    const selectedDate = new Date(useSelector( (state) => state.cash.curDate));
    const weeks = ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Ндл"];
    const [month, setMonth] = useState([undefined, undefined, undefined, undefined, undefined, undefined]);

    console.log(month);
    useEffect(()=>{
        setMonth(monthFormated(new Date(props.year, props.month)));
        console.log("ВИКЛИКАЛАСЯ!");
        console.log(props.year);
        console.log(props.month);
    }, [props.year]);
    const setDate = (e) =>{
        let updatedDate = new Date(props.year, props.month, e.target.textContent, +new Date().getHours(), +new Date().getMinutes(), +new Date().getSeconds());
        dispatch(addDateAction(updatedDate.getTime()));
        dispatch(addActiveAction(updatedDate));
        props.setTypeOfDuration('Місяць');
    }
    return (
        <div className="one-small-event">
            <p className="calendar-title">{getNameMonth(props.month, 1) }</p>
            <div className="one-calendar" >
                <table>
                    <thead>
                        <tr>
                            {weeks.map(week => <th key={week}>{week}</th>)}
                        </tr>
                    </thead>
                    <tbody >
                        {month.map((week, index) =>
                            week !== undefined && 
                                <tr className="row-calendar" key={index}>
                                    {week.map((day, index) =>
                                        day.toString().length <= 0
                                            ?
                                            <td key={index}>
                                                <p>{day}</p>
                                            </td>   
                                            :
                                            (selectedDate.getFullYear().toString() + props.month + day) === (new Date().getFullYear().toString() + new Date().getMonth() + new Date().getDate()) 
                                                ? 
                                                <td key={index} className='fill-cell today' onClick={setDate}>
                                                    <p>{day}</p>
                                                </td>
                                                :
                                                <td key={index} className='fill-cell' onClick={setDate}>
                                                    <p>{day}</p>
                                                </td>
                                    )}
                                </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default OneSmallMonth;