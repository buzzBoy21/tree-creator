import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import style from './App.module.css';
import { EditTree } from './components/editTree/EditTree';
import FolderStructureContext from './context/FolderStructureContext';
import { OutPut } from './components/outPut/outPut';
import ConfigurationProvider from './context/ConfigurationContext';
import ConfigModal from './components/ConfigModal/ConfigModal';
import { useState } from 'react';
import HelpModal from './components/helpModal/HelpModal';

function App() {
   const [openConfigModal, setOpenConfigModal] = useState(false);
   const [openHelpModal, setOpenHelpModal] = useState(false);

   return (
      <>
         <FolderStructureContext>
            <ChakraProvider>
               <Header
                  handleMoreInfoButton={() => {
                     setOpenHelpModal(true);
                  }}
                  handleConfigButton={() => {
                     setOpenConfigModal(true);
                  }}
               />
               <div className={style.containerPage}>
                  <EditTree></EditTree>
                  <ConfigurationProvider>
                     <OutPut></OutPut>
                     <ConfigModal isOpen={{ openConfigModal, setOpenConfigModal }}></ConfigModal>
                  </ConfigurationProvider>
                  <HelpModal isOpen={{ openHelpModal, setOpenHelpModal }}></HelpModal>
               </div>
            </ChakraProvider>
         </FolderStructureContext>
      </>
   );
}

export default App;
