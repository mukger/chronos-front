import React, {useState, useEffect } from "react";

import MyButton from '../components/UI/MyButton';
import Select from 'react-select';
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Month from "../components/Duration/Month";
import MyLoader from "../components/UI/MyLoader2";
import Week from "../components/Duration/Week";
import Year from "../components/Duration/Year";
import './Events.css';

const Event = (props) => {


        return (
            <div style={{marginTop:'100px'}}>ІВЕНТ</div>
        );
}

export default Event;
