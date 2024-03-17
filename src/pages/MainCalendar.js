import React, {useState, useEffect } from "react";

import MyButton from '../components/UI/MyButton';
import Select from 'react-select';
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Month from "../components/Duration/Month";
import MyLoader from "../components/UI/MyLoader2";
import Week from "../components/Duration/Week";
import Year from "../components/Duration/Year";
import './Calendar.css';

const MainCalendar = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [typeOfDuration, setTypeOfDuration] = useState('Місяць');

        return (
            <div className="calendar-container">

                    <div className="up-button">                
                        <Select 
                            className='select-create-user' 
                            name="roles" 
                            value={{value: typeOfDuration, label: typeOfDuration}}
                            isClearable={false}
                            options={[{value: 'Тиждень', label: 'Тиждень'}, {value: 'Місяць', label: 'Місяць'}, {value: 'Рік', label: 'Рік'}]}
                            onChange={(e)=>{setTypeOfDuration(e.value)}} 
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    primary: 'green',
                                    primary25: 'rgba(0,0,0,0.2)',
                                    neutral0: '#FFFFFF',
                                    neutral10: 'rgba(0, 0, 0, 0.2)',
                                    neutral20: 'rgba(0, 0, 0, 0.5)',
                                    neutral30: 'rgba(0, 0, 0, 0.3)',
                                    neutral40: 'rgb(0, 125, 0)',
                                    neutral50: 'rgba(0, 0, 0, 0.7)',
                                    neutral80: 'rgba(0, 0, 0, 0.7)',
                                    danger: 'red',
                                    dangerLight: 'rgba(255, 0, 0, 0.2)',
                                }
                                
                            })}
                        />
                    </div>
                
                {typeOfDuration === 'Місяць' &&
                    <Month modalActive={modalActive} setModalActive={setModalActive} typeCalendar={'main'} />
                }
                {typeOfDuration === 'Тиждень' &&
                    <Week modalActive={modalActive} setModalActive={setModalActive} typeOfDuration={typeOfDuration} typeCalendar={'main'}/>
                }
                {typeOfDuration === 'Рік' &&
                    <Year modalActive={modalActive} setModalActive={setModalActive} setTypeOfDuration={setTypeOfDuration} typeOfDuration={typeOfDuration}/>
                }

                
            </div>
        );
}

export default MainCalendar;

//1) Тиждень/рік
//2) ГУГЛ АПІ НАЦ СВЯТА
//3) Категорії до подій
//4) Кольора для подій
//5) Юзери для подій
//6) Сеарч клієнта