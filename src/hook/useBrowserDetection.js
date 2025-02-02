import { useEffect, useState } from 'react';

export function useBrowserDetection() {
   const [isChromeEdgeOrOpera, setChromeEdgeOrOpera] = useState(false);

   useEffect(() => {
      const userAgent = window.navigator.userAgent.toLowerCase();

      setChromeEdgeOrOpera(
         userAgent.includes('chrome') || userAgent.includes('edg') || userAgent.includes('opera')
      );
      // Checking if Navigator is Brave beacouse Brave use the Chrome's userAgent
      if (window.navigator.brave) {
         window.navigator.brave.isBrave().then((result) => {
            setChromeEdgeOrOpera(result ? false : true);
         });
      }
   }, []);

   return isChromeEdgeOrOpera;
}
