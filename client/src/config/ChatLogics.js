export const getSenderName = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderEmail = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].email : users[0].email;
};

export const getSenderPicture = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].picture : users[0].picture;
};

export const getSenderUser = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isFirstMessage = (messages, index) => {
    if(index === 0) return true ;
    return (
      index > 0 &&
      messages[index - 1].sender._id !== messages[index].sender._id ||
      !messages[messages.length - 1].sender._id
    );
  };
