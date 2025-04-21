import { Tabs, TabList, TabPanels, Tab, TabPanel, Alert, AlertIcon } from '@chakra-ui/react';
import style from './EditTree.module.css';
import Folder from '../folder/Folder';
import { useContext, useState } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
export function EditTree() {
   const [context, setContext] = useContext(FoldersContext);

   return (
      <div className={style.container}>
         <Tabs isFitted variant="enclosed">
            <TabList>
               <Tab>List</Tab>
               <Tab>Graph</Tab>
            </TabList>

            <TabPanels className={style.editFolderContainer}>
               <TabPanel>
                  {context.folders.map((folder) => (
                     <Folder
                        key={folder.folderId}
                        childrenFolders={folder.childrens}
                        idFolder={folder.folderId}
                        nameFolder={folder.name}></Folder>
                  ))}
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
