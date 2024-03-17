import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import getNameEvent from "./getNameEvent";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useNavigate } from "react-router-dom";

import './OneEvent.css';

function checkHours(index){
    switch (+index) {
        case 1:
            return 'годину';
        case 2:
            return 'години';
        case 3:
            return 'години';
        case 4:
            return 'години';
        default:
            return 'годин';
    }
}

const OneEvent = (props) => {
    const router = useNavigate();

    const changePost = (e) =>{
        e.stopPropagation();
        props.setDataInputed({...props.dataInputed, id: props.event.id, title: props.event.title, description: props.event.description, hours: props.event.date.getHours().toString(), minutes: props.event.date.getMinutes().toString(), type: props.event.type, duration:props.event.duration.toString()});
        props.setModalActive(3);
    }
    const [fetchDeleteEvent, isDeleteEventLoading, deleteEventError] = useFetching(async () => {
        await PostService.deleteEvent(
            localStorage.getItem('access'), 
            window.location.pathname.slice(window.location.pathname.indexOf('calendars/') + 10),
            props.event.id
        );
        props.fetchEvents();
    })

    useEffect(()=>{
        if(deleteEventError){
            setTimeout(()=>{
                router('/error');
            },50);
        }
    },[deleteEventError]);
    return (
        <div className={"one-event type-" + props.event.type} onClick={()=>{router(`/events/${props.event.id}`)}}>
            <p className="title">{props.event.title}</p>
            <p className="description">{props.event.description}
            </p>
            <p className="type">{getNameEvent(props.event.type)}</p>
            {(props.typeCalendar === 'ordinary' && (
                <div className="time">
                    <p>{props.event.date.getHours().toString().length === 1 ? '0' + props.event.date.getHours() : props.event.date.getHours()}</p>
                    <p>:</p>
                    <p>{props.event.date.getMinutes().toString().length === 1 ? '0' + props.event.date.getMinutes() : props.event.date.getMinutes()}</p>
                </div>
            ))}
            {props.event.type === 'arrangement' 
                ?
                <div className="duration">
                    <p>Триває {props.event.duration} {checkHours(props.event.duration)}</p>
                </div>
                
                :
                <div className="duration"></div>
            }
           
            {props.event.date.getTime() > new Date().getTime()
                ?
                <div className="change"> 
                    {props.role === 'admin' && 
                        <div>
                            <i onClick={changePost} className="fa fa-pencil-square" aria-hidden="true"></i>
                            <i onClick={(e) => {e.stopPropagation(); fetchDeleteEvent()}} className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    }
                </div> 
                :
                <div className="change"><div></div></div>
            }
           
        </div>
    );
}

export default OneEvent;