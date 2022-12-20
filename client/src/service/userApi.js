import axios from "axios" ;


const URL = "http://localhost:8000/api/user" ;


export const signupUserApi = async(userData) =>{
    try{
        return axios.post(`${URL}/signup` ,userData) ;
    }catch(error){
        console.log("Error while calling signupUser Api" ,error);
    }
}

export const loginUserApi = async(userData) =>{
    try{
        return axios.post(`${URL}/login`,userData) ;
    }catch(error){
        console.log("Error while calling loginUserApi ",error);
    }
}

export const uploadImageApi = async(data) =>{
    try{
        return await axios.post("https://api.cloudinary.com/v1_1/sameepVishwakarma/image/upload" ,data) ;
    }catch(error){
        console.log("Error while calling uploadImageApi" ,error);
    }
}
// ORR
// fetch("https://api.cloudinary.com/v1_1/sameepVishwakarma/image/upload" ,{
      //   method:"post",
      //   body:data,
      // }).then((res) =>res.json())  //converting res to json
      //   .then((data) =>{
      //     setUserPic(data.url) ;
      //     setLoading(false) ;
      //     setAlertType("success");
      //     setAlertTitle("Image uploaded successfully");
      //   })
      //   .then(()=>{
      //     console.log(userPic);
      //     setUserDetails({ ...userDetails, picture: userPic });
      //   })
      //   .catch((err) =>{
      //     console.log(err);
      //     setLoading(false) ;
      //     setAlertType("error");
      //     setAlertTitle("Failed to upload image - Try Again ");
      //   })