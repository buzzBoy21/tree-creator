import { Tabs, TabList, TabPanels, Tab, TabPanel, Alert, AlertIcon } from '@chakra-ui/react';
import FolderSkeleton from './FolderSkeleton';
import style from './../editTree/EditTree.module.css';
function EditTreeSkeleton() {
   return (
      <div className={style.container}>
         <Tabs isFitted variant="enclosed">
            <TabList>
               <Tab>List</Tab>
               <Tab>Graph</Tab>
            </TabList>

            <TabPanels className={style.editFolderContainer}>
               <TabPanel>
                  <FolderSkeleton></FolderSkeleton>
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

export default EditTreeSkeleton;
