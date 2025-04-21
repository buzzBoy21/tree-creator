import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import style from './App.module.css';
import { EditTree } from './components/editTree/EditTree';
import FolderStructureContext from './context/FolderStructureContext';
import OutPut from './components/outPut/outPut';
import ConfigurationProvider from './context/ConfigurationContext';
import ConfigModal from './components/ConfigModal/ConfigModal';
import { useState } from 'react';
function App() {
   const [openModal, setOpenModal] = useState(false);

   return (
      <>
         <FolderStructureContext>
            <ChakraProvider>
               <Header
                  handleConfigButton={() => {
                     setOpenModal(true);
                  }}
               />
               <div className={style.containerPage}>
                  <EditTree></EditTree>
                  <ConfigurationProvider>
                     <OutPut></OutPut>
                     <ConfigModal isOpen={{ openModal, setOpenModal }}></ConfigModal>
                  </ConfigurationProvider>
               </div>
            </ChakraProvider>
         </FolderStructureContext>
      </>
   );
}

export default App;
