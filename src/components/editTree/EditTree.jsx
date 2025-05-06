import { Tabs, TabList, TabPanels, Tab, TabPanel, Alert, AlertIcon } from '@chakra-ui/react';
import style from './EditTree.module.css';
import Folder from '../folder/Folder';
import { useContext, useState } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import { ImportFolders } from '../importFolder/ImportFolders';
import { useBrowserDetection } from '../../hook/useBrowserDetection';
export function EditTree() {
   const [context, setContext] = useContext(FoldersContext);
   const canIuseShowDirectoryPicker = useBrowserDetection();
   return (
      <div className={style.container}>
         <Tabs isFitted variant="enclosed">
            <TabList>
               <Tab>List</Tab>
               <Tab>Graph</Tab>
            </TabList>

            <TabPanels className={style.editFolderContainer}>
               <TabPanel>
                  {context.folders.length ? (
                     context.folders.map((folder) => (
                        <Folder
                           key={folder.folderId}
                           childrenFolders={folder.children}
                           idFolder={folder.folderId}
                           nameFolder={folder.name}></Folder>
                     ))
                  ) : (
                     <div className={style.listImportContainer}>
                        <ImportFolders useShowDirectoryPicker={canIuseShowDirectoryPicker}>
                           Import Folders
                        </ImportFolders>
                        <Alert status="warning" width={'fit-content'}>
                           <AlertIcon />
                           If you import a huge folder, it may take a while.
                        </Alert>
                     </div>
                  )}
               </TabPanel>
               <TabPanel>
                  <Alert status="warning">
                     <AlertIcon />
                     This feature will be implemented in the future
                  </Alert>
               </TabPanel>
            </TabPanels>
         </Tabs>
      </div>
   );
}
