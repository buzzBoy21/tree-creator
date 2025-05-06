import { useEffect, useState } from 'react';

function useTimeOut(evalVariable) {
   const [timeOutMilliseconds, setTimeOutMilliseconds] = useState(2000);
   useEffect(() => {
      if (evalVariable < 1000) {
         setTimeOutMilliseconds(500);
      } else if (evalVariable < 1500) {
         setTimeOutMilliseconds(1000);
      } else if (evalVariable < 2200) {
         setTimeOutMilliseconds(1200);
      } else if (evalVariable < 2700) {
         setTimeOutMilliseconds(1500);
      } else if (evalVariable > 5000) {
         setTimeOutMilliseconds(5000);
      }
   }, [evalVariable]);

   return [timeOutMilliseconds];
}

export default useTimeOut;
