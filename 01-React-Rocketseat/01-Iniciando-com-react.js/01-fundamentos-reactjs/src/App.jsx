import {Post} from "./components/Post"
import { Header } from "./components/Header"
import styles from './App.module.css'
import './global.css'
import { Sidebar } from "./components/Sidebar"

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/Carvalho2099.png',
      name: 'Felipe Carvalho',
      role: 'Dev Fullstack'
    },
    content: [
      {type: 'paragraph', content: 'É isso ai!!'},
      {type: 'paragraph', content: 'Acabei de subir umas paradas ai.'},
      {type: 'link', content: 'site.com.'},
    ],
    publishedAt: new Date('2024-05-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/Carvalho2099.png',
      name: 'Felipe Carvalho',
      role: 'Dev Fullstack'
    },
    content: [
      {type: 'paragraph', content: 'É isso ai!!'},
      {type: 'paragraph', content: 'Acabei de subir umas paradas ai.'},
      {type: 'link', content: 'site.com.'},
    ],
    publishedAt: new Date('2024-05-03 20:00:00')
  },
  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/Carvalho2099.png',
      name: 'Felipe Carvalho',
      role: 'Dev Fullstack'
    },
    content: [
      {type: 'paragraph', content: 'É isso ai!!'},
      {type: 'paragraph', content: 'Acabei de subir umas paradas ai.'},
      {type: 'link', content: 'site.com.'},
    ],
    publishedAt: new Date('2024-05-03 20:00:00')
  },
];

export function App() {
  return (
    <>
    <Header/>
    <div className={styles.wrapper}>
      <Sidebar />
      <main>
        {posts.map(post => {
          return (<Post 
            key={post.id}
            author={post.author}
            content={post.content}
            publishedAt={post.publishedAt}
          />
          )
        })}    
      </main>
    </div>
    </>
  )
}


