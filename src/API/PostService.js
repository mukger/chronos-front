import axios from "axios";

export default class PostService {
    static async login(login, password){
        let obj = {login:login, psw:password};
        
        const response = await axios.post('http://192.168.20.251:3001/api/auth/login',
        obj, 
        {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        return response;
    }
    static async register(login, password, email, fullName){
        let obj = {login:login, psw:password, repeatpsw: password, email:email, fname:fullName};
        
        const response = await axios.post('http://192.168.20.251:3001/api/auth/register',
        obj, 
        {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        return response;
    }
    static async forgotPassword(login){
        const response = await axios.post(
            'http://192.168.20.251:3001/api/auth/password-reset',
            {login: login}, 
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        return response;
    }

    static async resetPassword(password, token, login){
        const response = await axios.post(
            `http://192.168.20.251:3001/api/auth/password-reset/${token}`,
            {newpsw: password, repeatnewpsw: password, login: login},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        return response;
    }

    static async refreshToken(token){
        const response = await axios.post(
            `http://192.168.20.251:3001/api/refresh-tokens`,
            {refreshToken: token},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        return response;
    }

    static async getUserInfo(token){
        
        const response = await axios.get(
            `http://192.168.20.251:3001/api/me`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async getUserAvatar(token){
        const response = await axios.get(
            `http://192.168.20.251:3001/api/me/avatar`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async changeUserInfo(token, info){
        let obj = {login:info.login, email:info.email, fname:info.full_name};
        const response = await axios.patch(
            `http://192.168.20.251:3001/api/me`,
            obj,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async deleteUserInfo(token){
        const response = await axios.delete(
            `http://192.168.20.251:3001/api/me`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async patchUserAvatar(token, selectedFile){
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const response = await axios.patch(
            `http://192.168.20.251:3001/api/me/avatar`,
            formData,
            {'headers': {'Content-Type':'multipart/form-data', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }


    /*
    static async getUserAvatarLogin(login){
        const response = await axios.get(
            `https://us0f-backend.herokuapp.com/api/users/avatar/${login}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        
        return response;
    }
    static async getUserInfoLogin(login){
        const response = await axios.get(
            `https://us0f-backend.herokuapp.com/api/users/${login}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json'}});
        
        return response;

    }

    static async getUsers(token){
        const response = await axios.get(
            `https://us0f-backend.herokuapp.com/api/users`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + token}});
        return response;
    }
    static async getUserByLogin(token, login){
        const response = await axios.get(
            `https://us0f-backend.herokuapp.com/api/users/${login}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + token}});
        return response;
    }
    static async createUser(token, data){
        const response = await axios.post(
            `https://us0f-backend.herokuapp.com/api/users`,
            {
                login: data.login,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
                email: data.email,
                fullName: data.fullName,
                role: data.role
            },
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + token}});
        return response;
    }
    static async changeUserInfoAdmin(token, data){
        const response = await axios.patch(
            `https://us0f-backend.herokuapp.com/api/users/${data.userID}`,
            {
                login: data.login,
                email: data.email,
                fullName: data.fullName,
                role: data.role
            },
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + token}});
        return response;
    }
    static async changeUserAvatar(token, id, selectedFile){
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const response = await axios.patch(
            `https://us0f-backend.herokuapp.com/api/users/avatar/${id}`,
            formData,
            {'headers': {'Content-Type':'multipart/form-data', 'Accept':'application/json', 'Authorization': 'Bearer '  + token}});
        
        return response;
    }
    static async deleteUser(token, id){
        const response = await axios.delete(
            `https://us0f-backend.herokuapp.com/api/users/${id}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer '  + token}});
        
        return response;
    }*/
    static async getCalendarsOwn(token){
        const response = await axios.get(
            `http://192.168.20.251:3001/api/calendars/own`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async getCalendarsSubscribed(token){
        const response = await axios.get(
            `http://192.168.20.251:3001/api/calendars/subsTo`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async createCalendar(token, title, desc){
        const response = await axios.post(
            `http://192.168.20.251:3001/api/calendars`,
            {title: title, description: desc},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async changeCalendar(token, id, title, desc){
        const response = await axios.patch(
            `http://192.168.20.251:3001/api/calendars/${id}`,
            {title: title, description: desc},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async deleteCalendar(token, id){
        const response = await axios.delete(
            `http://192.168.20.251:3001/api/calendars/${id}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }


    static async getEventsByMonth(token, calendarID, year, month){
        const response = await axios.get(
            `http://192.168.20.251:3001/api/calendars/${calendarID}/events?month=${year}-${month}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }
    static async createEvent(token, calendarID, title, description, date, type, duration){

        if(type === 'arrangement'){
            const response = await axios.post(
                `http://192.168.20.251:3001/api/calendars/${calendarID}/events`,
                {title: title, description: description, executionDate: date, type: type, duration: +duration * 3600, utc: -1 * (new Date().getTimezoneOffset() / 60)},
                {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
            );
            return response;
        }
        else{
            const response = await axios.post(
                `http://192.168.20.251:3001/api/calendars/${calendarID}/events`,
                {title: title, description: description, executionDate: date, type: type, utc: -1 * (new Date().getTimezoneOffset() / 60)},
                {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
            );
            return response;
        }
        
    }
    static async changeEvent(token, calendarID, eventID, title, description, date, type, duration){

        if(type === 'arrangement'){
            const response = await axios.patch(
                `http://192.168.20.251:3001/api/calendars/${calendarID}/events/${eventID}`,
                {title: title, description: description, executionDate: date, type: type, duration: +duration * 3600, utc: -1 * (new Date().getTimezoneOffset() / 60)},
                {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});   
            return response;
        }
        else{
            const response = await axios.patch(
                `http://192.168.20.251:3001/api/calendars/${calendarID}/events/${eventID}`,
                {title: title, description: description, executionDate: date, type: type, utc: -1 * (new Date().getTimezoneOffset() / 60)},
                {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});  
            return response;
        }
    }
    static async deleteEvent(token, calendarID, eventID){
        const response = await axios.delete(
            `http://192.168.20.251:3001/api/calendars/${calendarID}/events/${eventID}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static async getAllUsersSubsedToCalendar(token, id){

        const response = await axios.get(
            `http://192.168.20.251:3001/api/calendars/${id}/subscribe`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}});
        
        return response;
    }

    static async subscribeUserToCalendar(token, id, userLogin, userRole){
        const response = await axios.post(
            `http://192.168.20.251:3001/api/calendars/${id}/subscribe`,
            {userLogin: userLogin, role: userRole},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
        );
        
        return response;
    }

    static async unsubscribeUserFromCalendar(token, id, userId){
        const response = await axios.delete(
            `http://192.168.20.251:3001/api/calendars/${id}/subscribe/${userId}`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
        );
        return response;

    }

    static async changeSubscribedUserRole(token, id, userId, userRole){
        const response = await axios.patch(
            `http://192.168.20.251:3001/api/calendars/${id}/subscribe/${userId}`,
            {role: userRole},
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
        );
        return response;
    }

    static async getUserRole(token, id){
        const response = await axios.get(
            `http://192.168.20.251:3001/api/calendars/${id}/role`,
            {'headers': {'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': token}}
        );
        return response;
    }

    static async getCountryInfoFromIpApi() {
        const options = {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',
                        'Accept': 'aplication/json' },
            url: `http://ip-api.com/json/`
        };
        return axios(options)
                    .then(response => {
                        let countryCode = response.data.countryCode.toLowerCase();
                        switch(countryCode) {
                            case 'au': countryCode = 'australian'; break;
                            case 'at': countryCode = 'austrian'; break;
                            case 'br': countryCode = 'brazilian'; break;
                            case 'bg': countryCode = 'bulgarian'; break;
                            case 'ca': countryCode = 'canadian'; break;
                            case 'cn': countryCode = 'china'; break;
                            case 'hr': countryCode = 'croatian'; break;
                            case 'cz': countryCode = 'czech'; break;
                            case 'dk': countryCode = 'danish'; break;
                            case 'fi': countryCode = 'finnish'; break;
                            case 'fr': countryCode = 'french'; break;
                            case 'de': countryCode = 'german'; break;
                            case 'gr': countryCode = 'greek'; break;
                            case 'hk': countryCode = 'hong_kong'; break;
                            case 'hu': countryCode = 'hungarian'; break;
                            case 'in': countryCode = 'indian'; break;
                            case 'id': countryCode = 'indonesian'; break;
                            case 'ie': countryCode = 'irish'; break;
                            case 'il': countryCode = 'jewish'; break;
                            case 'it': countryCode = 'italian'; break;
                            case 'jp': countryCode = 'japanese'; break;
                            case 'lv': countryCode = 'latvian'; break;
                            case 'lt': countryCode = 'lithuanian'; break;
                            case 'my': countryCode = 'malaysia'; break;
                            case 'mx': countryCode = 'mexican'; break;
                            case 'nl': countryCode = 'dutch'; break;
                            case 'nz': countryCode = 'new_zealand'; break;
                            case 'no': countryCode = 'norwegian'; break;
                            case 'ph': countryCode = 'philippines'; break;
                            case 'pl': countryCode = 'polish'; break;
                            case 'pt': countryCode = 'portuguese'; break;
                            case 'ro': countryCode = 'romanian'; break;
                            case 'ru': countryCode = 'russian'; break;
                            case 'sa': countryCode = 'saudiarabian'; break;
                            case 'sg': countryCode = 'singapore'; break;
                            case 'sk': countryCode = 'slovak'; break;
                            case 'si': countryCode = 'slovenian'; break;
                            case 'kr': countryCode = 'south_korea'; break;
                            case 'es': countryCode = 'spain'; break;
                            case 'se': countryCode = 'swedish'; break;
                            case 'tw': countryCode = 'taiwan'; break;
                            case 'tl': countryCode = 'thai'; break;
                            case 'tr': countryCode = 'turkish'; break;
                            case 'ua': countryCode = 'ukrainian'; break;
                            case 'us': countryCode = 'usa'; break;
                            case 'vn': countryCode = 'vietnamese'; break;
                            default: break;
                        }

                        return {countryCode: countryCode, country: response.data.country};
                    })
    }

    static async getHolidaysCalendarInfoFromGoogleAPI(){
        let countryInfo = await this.getCountryInfoFromIpApi();

        const options = {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',
                        'Accept': 'aplication/json' },
            url: `https://www.googleapis.com/calendar/v3/calendars/en.${countryInfo.countryCode}%23holiday%40group.v.calendar.google.com/events?key=AIzaSyBYOyDCJzSEHWD0FB7WhLnN-W3x7B1Oldw`
        };
        return axios(options)
                    .then(response => {
                        return {title: response.data.summary, description: `Calendar that reflects the main holidays in ${countryInfo.country}`}
                    })
    }

    static async getEventsHolidaysCalendarByMonthFromGoogleAPI(year, month){
        let countryInfo = await this.getCountryInfoFromIpApi();

        const options = {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',
                        'Accept': 'aplication/json' },
            url: `https://www.googleapis.com/calendar/v3/calendars/en.${countryInfo.countryCode}%23holiday%40group.v.calendar.google.com/events?key=AIzaSyBYOyDCJzSEHWD0FB7WhLnN-W3x7B1Oldw`
        };
        return axios(options)
                    .then(response => {
                        let res = [];
                        for(let i = 0, j = 0; i < response.data.items.length; i++) {
                            if(response.data.items[i].start.date.includes(`${year}-${month}`)) {
                                let tempObj = {}
                                tempObj.id = j;
                                tempObj.title = response.data.items[i].summary;
                                tempObj.description = response.data.items[i].description.replace(`\nTo hide observances, go to Google Calendar Settings > Holidays in ${countryInfo.country}`, '');
                                tempObj.execution_date = response.data.items[i].start.date;
                                tempObj.type = 'holiday';
                                tempObj.duration = new Date(response.data.items[i].end.date).getTime() - new Date(response.data.items[i].start.date).getTime();
                                res[j] = tempObj;
                                j++;
                            }
                        }
                        return res;
                    })
    }
}   