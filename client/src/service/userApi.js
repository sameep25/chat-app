import axios from "axios" ;


const URL = "http://localhost:8000/api/user" ;


export const signupUserApi = async(userData) =>{
    try{
        axios.post(`${URL}/signup` ,userData) ;
    }catch(error){
        console.log("Error while calling signupUser Api" ,error);
    }
}

export const loginUserApi = async(userData) =>{
    try{
        await axios.post(`${URL}/login`,userData) ;
    }catch(error){
        console.log("Error while calling loginUserApi ",error);
    }
}