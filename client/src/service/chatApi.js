import axios from "axios";

const URL = "http://localhost:8000/api/chat";

export const accessChatApi = async (userId, config) => {
  try {
    return axios.post(`${URL}/`, { userId }, config);
  } catch (error) {
    console.log("Error while calling accessChatApi : ", error);
  }
};

export const fetchChatsApi = async (config) => {
  try {
    return axios.get(`${URL}/all`, config);
  } catch (error) {
    console.log("Error while calling fetchChatsApi ", error);
  }
};

export const createNewGroupApi = async (config, groupData) => {
  try {
    // console.log(groupData);
    return await axios.post(`${URL}/group/new`,  groupData , config);
  } catch (error) {
    console.log("Erroe while calling creteNewGroupApi ", error);
  }
};

export const renameGroupApi = async(config ,chatData) => {
  try{
    return await axios.put(`${URL}/group/rename` ,chatData , config) ;
  }catch(error){
    console.log("Error while calling renameGroupApi " ,error);
  }
}

export const addUserToGroupApi = async(config ,userData) => {
  try{
    return await axios.put(`${URL}/group/add` ,userData , config) ;
  }catch(error){
    console.log("Error while calling addUserToGroupApi " ,error);
  }
}

export const removeUserFromGroupApi = async(config ,userData) => {
  try{
    return await axios.put(`${URL}/group/remove` ,userData , config) ;
  }catch(error){
    console.log("Error while calling removeUserFromGroupApi " ,error);
  }
}

export const deleteGroupApi = async(config ,chatId) =>{
  try{
    console.log(chatId);
    return await axios.delete(`${URL}/group/delete/${chatId}`,config ) ;
  }catch(error){
    console.log("Error while calling deleteGroupApi " ,error);
  }
}