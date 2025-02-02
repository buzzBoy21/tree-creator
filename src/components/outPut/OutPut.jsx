import { useContext, useEffect, useState } from 'react';
import style from './outPut.module.css';
import { FoldersContext } from '../../context/FolderStructureContext';
import { makeOutPut } from '../../utils/makeOutPut';
export default function OutPut() {
   const [context, seContext] = useContext(FoldersContext);
   const [outPutText, setOutPutText] = useState('');
   useEffect(() => {
      const outPut = makeOutPut(context.folders);
      setOutPutText(outPut);
      console.log(outPut);
   }, [context]);

   return <div className={style.container}>{outPutText}</div>;
}
