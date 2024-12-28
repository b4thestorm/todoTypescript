import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import  TextField  from '@mui/material/TextField';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/joy/Chip';
import Box from '@mui/material/Box';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function TodoCard({todo})  {
  // eslint-disable-next-line   @typescript-eslint/no-unused-vars
  const [editable, setEditable] = useState(false)
  const [todoState, setTodoState] = useState({
      id: todo.id || crypto.randomUUID(), 
      message: todo.message || '',
      status: todo.status || false
  })

  // const Change = (): void => {
  //   setTodoState((prevState) => ({...prevState, status: !prevState.status}))
  // }

  const STATUS = {
    true: 'Done',
    false: 'Doing'
  }
  const messageChange = (event): void => {
    setTodoState((prevState) => ({...prevState, message: event.target.value})
    )
  }
  const statusChange = (): void => {
    setTodoState((prevState) => ({...prevState, status: !prevState.status}))
  }

  return (
      <form>
        <Card sx={{ width: 400, maxWidth: 400 }}>
            <CardActionArea>
              <CardContent>
                <CardMedia>
                {!editable ? (
                    <Typography gutterBottom variant="h5" component="div">
                      {todoState.message}
                    </Typography>
                  ):(
                    <TextField
                    id="outlined-multiline-static"
                    label="What do you want to do with your time"
                    value={todoState.message}
                    onChange={messageChange}
                    multiline
                    rows={3}
                    sx={{
                      width: '360px',
                      height: '60px'
                    }}
                  />
                  )}
                </CardMedia>       
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '50px',
                }}>
                  <Chip>{STATUS[todoState.status]}</Chip>
                  <Switch disabled={!editable} onChange={statusChange} name="status"/>
                  {editable ? (
                    <Button variant="contained">Confirm</Button>
                    ) : (
                    <Button variant="contained" onClick={()=> setEditable(true)}>Edit</Button>
                  )}
                </Box>
              </CardContent>
            </CardActionArea>
        </Card>
      </form>
  );
}