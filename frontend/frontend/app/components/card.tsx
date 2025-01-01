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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function TodoCard({todo, setRerender})  {
  // eslint-disable-next-line   @typescript-eslint/no-unused-vars
  const [editable, setEditable] = useState(false)
  const [todoState, setTodoState] = useState({
      id: todo.id || crypto.randomUUID(), 
      message: todo.message || '',
      status: todo.status || false
  })

  const STATUS = {
    true: 'Done',
    false: 'Doing'
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/create', {
      method: "POST",
      body: JSON.stringify(todoState)
    })
    console.log(response.status)
  }

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/delete/${id}`, {
        method: "DELETE",
      })
      console.log("twas a success",response.status)
      setRerender(renderCount => renderCount + 1)
    } catch(error) {
      console.error("delete not successful", error)
    }
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
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={(event) => handleDelete(event, todoState.id)}
                >
                  <CloseIcon />
                </IconButton>
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
                    <>
                      <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                    </>
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