import styles from "./page.module.css";
import ActionAreaCard from './components/card';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <>
          <h1>Todo App</h1>
          <ActionAreaCard/>
        </>
      </main>
      
    </div>
  )
}

