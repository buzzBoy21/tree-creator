let resourceCache = null;
import React, { useEffect, useMemo, useRef } from 'react';
export function createResourceFromPromise(promiseFactory) {
   let status = 'pending';
   let result;
   let suspender = promiseFactory().then(
      (r) => {
         status = 'success';
         result = r;
      },
      (e) => {
         status = 'error';
         result = e;
      }
   );

   return {
      read() {
         if (status === 'pending') throw suspender;
         if (status === 'error') throw result;
         // En éxito devolvemos el valor que necesites.
         // Si no hay dato que devolver, podrías devolver `true` o `null`.
         return result;
      },
   };
}
/**
 * Function to load the folder structure an throw a promise
 * @param {FileList} files a list of files
 * @param {Function} doThis a function to execute when the files are loaded
 * @returns {JSX.Element} a React component that shows a "hola a ver si estoy" message
 */
function LoadFolderStructure({ files, doThis = () => {} }) {
   const resourceRef = useRef(
      createResourceFromPromise(
         () =>
            new Promise((resolve) => {
               setTimeout(() => {
                  // setTimeout to generate delay to let react throw the promise
                  doThis(files);
                  resolve();
               }, 0);
            })
      )
   );
   resourceRef.current.read();

   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   console.log('renderizo de nuevo');
   return null;
}
export default LoadFolderStructure;
