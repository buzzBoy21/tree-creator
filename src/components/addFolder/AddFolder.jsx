import { Button, Input } from '@chakra-ui/react';
import style from './addFolder.module.css';
import { useState } from 'react';
import { useContext } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import { findAndInsert } from '../../utils/insertFolder';

export default function AddFolder({ folderId }) {
   const [newFolderName, setNewFolderName] = useState('');

   const [context, setContext] = useContext(FoldersContext);
   const newId = context.highestId++;

   function handleButton(folderList, parentFolderId) {
      const wasGood = findAndInsert(folderList, parentFolderId, {
         folderId: newId,
         name: newFolderName,
         description: '',
         children: [],
      });
      if (wasGood) {
         setContext({ folders: folderList, highestId: newId });
         setNewFolderName('');
      }
   }
   function handleInput(e) {
      setNewFolderName(e.target.value);
   }
   return (
      <div className={style.containerAddFolder}>
         <Input
            value={newFolderName}
            onChange={(e) => handleInput(e)}
            placeholder="Folder name"
            size="sm"
         />
         <Button
            colorScheme="gray"
            variant="solid"
            onClick={() => handleButton(context.folders, folderId)}>
            Create
         </Button>
      </div>
   );
}
