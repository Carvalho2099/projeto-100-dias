import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
export function Post() {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src="https://github.com/Carvalho2099.png"/>
                    <div className={styles.authorInfo}>
                        <strong>Felipe Carvalho</strong>
                        <span>Web Developer</span>
                    </div>
                </div>
                <time dateTime='2024-02-20'>Publicado há 1h</time>
            </header>
            <div className={styles.content}>
                <p>é isso ai</p>
                <p><a href="#">teste.teste.com</a></p>
            </div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    placeholder='Deixe um comentário.'
                />
                <footer>
                    <button type='submit'>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </article>
    )
}