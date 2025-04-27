import { ChakraProvider } from '@chakra-ui/react';

import FolderStructureContext from './context/FolderStructureContext';

import MainLayout from './layout/MainLayout';

function App() {
   return (
      <>
         <FolderStructureContext>
            <ChakraProvider>
               <MainLayout />
            </ChakraProvider>
         </FolderStructureContext>
      </>
   );
}

export default App;
