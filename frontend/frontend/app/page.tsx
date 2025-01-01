'use client'

import React, {useState, useEffect} from 'react'
import styles from "./page.module.css";
import TodoCard from './components/card';
import Todo from '../../../types/todo';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function Home():any {
  const [todo, setTodo] = useState([])
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
      <IconButton>
        <AddIcon/>
      </IconButton>
      <h1>Todo App</h1>
          {todo.map((task: Todo) => (
            <TodoCard key={task.id} todo={task} setRerender={setRerender}/>
          ))}
      </>
      </main>
    </div>
  )
}

