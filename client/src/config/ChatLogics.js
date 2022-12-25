export const getSenderName = (loggedUser ,users) =>{
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name ;
}

export const getSenderEmail = (loggedUser ,users) =>{
    return users[0]._id === loggedUser._id ? users[1].email : users[0].email ;
}

export const getSenderPicture = (loggedUser ,users) =>{
    return users[0]._id === loggedUser._id ? users[1].picture : users[0].picture ;
}