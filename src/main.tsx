import { createRoot } from 'react-dom/client';
import { Atlas } from './atlas/Atlas';
import './style.css';

function Welcome() {
  return <main className="welcome">
    <div><h1>CONTINUUM</h1>
      <p>Исследуйте мир на общей шкале времени.</p>
      <a className="enter" href="/atlas">Войти в атлас</a>
    </div>
  </main>;
}

const path = window.location.pathname.replace(/\/$/, '');
const root = document.getElementById('root')!;
if (path === '/atlas') document.title = 'Архитектура · CONTINUUM';
createRoot(root).render(path === '/atlas' ? <Atlas /> : path === '' ? <Welcome /> :
  <main className="welcome"><div><h1>Страница не найдена</h1><a href="/">На главную</a></div></main>);
