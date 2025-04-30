import style from './LineSkeleton.module.css';
function LineSkeleton({ backgroundIsDark, align = 'left', startAt, endAt }) {
   let spanStyle = {};
   let divStyle = {};
   if (align === 'left') {
      spanStyle = {
         align: align,
         width: endAt ?? 'auto',
         backgroundColor: backgroundIsDark ? '#333' : '#aaa',
      };
      divStyle = { marginLeft: startAt };
   } else if (align === 'right') {
      spanStyle = { align: align, width: endAt };
      divStyle = { marginRight: startAt ?? 'auto' };
   }
   return (
      <div className={style.container + ' ' + style.shimmer} style={{ height: '1em', ...divStyle }}>
         <span style={{ height: '100%', ...spanStyle }}></span>
      </div>
   );
}

export default LineSkeleton;
