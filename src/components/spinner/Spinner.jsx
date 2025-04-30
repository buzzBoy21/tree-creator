import style from './Spinner.module.css';
function Spinner({ height = '1.5em', width = '1.5em' }) {
   return <div className={style.spinner} style={{ width: height, height: width }}></div>;
}

export default Spinner;
