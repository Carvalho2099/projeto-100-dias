import {Post} from "./components/Post"
import { Header } from "./components/Header"
import styles from './App.module.css'
import './global.css'
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <>
    <Header/>
    <div className={styles.wrapper}>
      <Sidebar />
      <main>
        <Post author="Felipe Carvalho" content="é isso ai"/>
        <Post author="Lisa Rayane" content="uhuuul"/>    
      </main>
    </div>
    </>
  )
}


