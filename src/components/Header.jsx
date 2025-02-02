import logo from './../assets/react.svg';
import style from './header.module.css';
export function Header() {
   return (
      <header className={style.header}>
         <img src={logo} alt="dsadsa" style={{ height: '100%', width: 'auto' }} />
      </header>
   );
}
