import axios from "axios";

const URL = "http://localhost:8000/api/message" ;

export const sendMessageApi = async(config ,messageData) =>{
    try{
        return await axios.post(`${URL}/send` ,config ,messageData) ;
    }catch(error){
        console.log("Error while calling sendMessageApi : " ,error);
    }
}

export const fetchMessagesApi = async(config ,chatId) =>{
    try{
        return await axios.get(`${URL}/get/${chatId}` ,config) ;
    }catch(error){
        console.log("Error while calling fetchMessagesApi : " ,error);
    }
}