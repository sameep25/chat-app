import axios from "axios" ;


const URL = "http://localhost:8000" ;

export const fetchUser = async() =>{
    return await axios.get(`${URL}/users`) ;
}