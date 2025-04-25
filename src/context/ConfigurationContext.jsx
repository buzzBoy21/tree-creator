import { createContext, useEffect, useState } from 'react';
import { defaultConfiguration } from '../assets/constants';
export const ConfigurationContext = createContext();

function ConfigurationProvider({ children }) {
   const [valueContext, setValueContext] = useState(() => {
      const storedConfiguration = localStorage.getItem('configuration');
      if (storedConfiguration) {
         const parsedConfig = JSON.parse(storedConfiguration);
         return parsedConfig;
      } else {
         return defaultConfiguration;
      }
   });

   useEffect(() => {
      console.log('valueContext', valueContext);
      if (valueContext != defaultConfiguration) {
         localStorage.setItem('configuration', JSON.stringify(valueContext));
      }
   }, [valueContext]);

   return (
      <ConfigurationContext.Provider value={[valueContext, setValueContext]}>
         {children}
      </ConfigurationContext.Provider>
   );
}

export default ConfigurationProvider;
