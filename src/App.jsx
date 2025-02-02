import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import { useBrowserDetection } from './hook/useBrowserDetection';
import { ImportFolders } from './components/importFolder/ImportFolders';
import style from './App.module.css';
import { EditTree } from './components/editTree/EditTree';
import FolderStructureContext from './context/FolderStructureContext';
import OutPut from './components/outPut/outPut';
function App() {
   //return true if navigator is edge, chrome or opera
   const canIuseShowDirectoryPicker = useBrowserDetection();

   return (
      <>
         <FolderStructureContext>
            <ChakraProvider>
               <Header />
               <div className={style.containerPage}>
                  <ImportFolders useShowDirectoryPicker={canIuseShowDirectoryPicker}>
                     Import Folders
                  </ImportFolders>
                  <div className={style.principalExperience}>
                     <EditTree></EditTree>
                     <OutPut></OutPut>
                  </div>
               </div>
            </ChakraProvider>
         </FolderStructureContext>
      </>
   );
}

export default App;
