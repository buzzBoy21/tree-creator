import { useEffect, useState } from 'react';

function useWindowSize() {
   const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
   useEffect(() => {
      window.addEventListener('resize', () => {
         setTimeout(() => {
            setSize([window.innerWidth, window.innerHeight]);
         }, 300);
      });
   }, []);
   return size;
}

export default useWindowSize;
