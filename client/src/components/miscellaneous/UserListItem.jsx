import React from 'react'
import { Box ,Avatar, Typography ,styled } from '@mui/material'

const Container = styled(Box)`
display:flex ;
  align-items:center ;
  margin: 1em 1em 0 1em;
  border-radius:4px ; 
  padding: 4px;
  :hover{
    cursor: pointer;
    background:#2e3b49 ;
  }
`
const TextContainer = styled(Box)`
  margin-left:0.5em;
  &>p{
    font-family:work sans ;
  }
`

const UserListItem = ({user ,handleFunction}) => {
  return (
    <Container >
      <Avatar src={user.picture} sx={{ width: 32, height: 32 }}></Avatar>
      <TextContainer>
        <Typography sx={{fontSize : "small"}} >{user.name}</Typography>
        <Typography sx={{fontSize : "xx-small"}} >{user.email}</Typography>
      </TextContainer>
    </Container>
  )
}

export default UserListItem