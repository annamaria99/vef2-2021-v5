import s from './Layout.module.scss';

export function Layout({ title, children }) {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
      </header>
      <main className={s.layout__main}>
        {children}
      </main>
      <hr></hr>
      <div className={s.link}>
        <p>Fréttir frá <a href="https://www.ruv.is/" > RÚV</a></p>
      </div>
    </div>
  )
}
