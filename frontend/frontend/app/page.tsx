'use client'

import React, {useState, useEffect} from 'react'
import styles from "./page.module.css";
import ActionAreaCard from './components/card';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function Home():any {
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
  const [todo, setTodo] = useState([])
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <>
      <h1>Todo App</h1>
          {todo.map((task) => (
            <ActionAreaCard key={task["id"]} todo={task}/>
          ))}
      </>
      </main>
      
    </div>
  )
}

