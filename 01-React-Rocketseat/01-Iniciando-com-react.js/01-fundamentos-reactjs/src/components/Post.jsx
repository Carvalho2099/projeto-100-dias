import styles from './Post.module.css'
export function Post() {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/Carvalho2099.png" />
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
        </article>
    )
}