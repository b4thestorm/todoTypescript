'use client'

import React, {useState, useEffect} from 'react'
import styles from "./page.module.css";
import TodoCard from './components/card';
import Todo from '../../../types/todo';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Stack  from '@mui/material/Stack';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function Home():any {
  const [todo, setTodo] = useState([])
  const [preview, setPreview] = useState(false)
  const [rerender, setRerender] = useState(0)

  async function getData() {
    const url = "http://localhost:3001/list";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setTodo(json)

    } catch (error) {
      console.error(error);
    }
  }
  //INITIAL RENDER
  useEffect(() => {
    getData()
  }, [])



  // RE-RENDER
  useEffect(() => {
    getData()
  }, [rerender])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px'}}>
        <h1>Todo App</h1>
        <IconButton  sx={{
          position: 'relative',
          top: 0,
          right: 0,
          }} 
          color="success"
          onClick={() => setPreview(true)}
          >
          <AddIcon/>
        </IconButton>
      </Box>
      <Stack spacing={2}>
          {preview && (
            <Box>
              <TodoCard todo={{id: crypto.randomUUID(), message: '', status: false}} setRerender={setRerender}/>
            </Box>
          )}

          {todo.map((task: Todo) => (
            <Box key={crypto.randomUUID()}>
              <TodoCard todo={task} setRerender={setRerender}/>
            </Box>
          ))}
      </Stack>
      </>
      </main>
    </div>
  )
}

