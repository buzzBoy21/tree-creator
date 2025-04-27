import { Button } from '@chakra-ui/react';
import style from './style.module.css';
import { parseToArray, eliminateDuplicateURL, buildStructure } from '../../utils/parseFolders';
import { useContext } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';

export function ImportFolders({ useShowDirectoryPicker, children }) {
   const [context, setContext] = useContext(FoldersContext);
   function handleImportFolder(event) {
      // in the future change for chrome file picker useShowDirectoryPicker=true -> chrome picker
      if (useShowDirectoryPicker || !useShowDirectoryPicker) {
         //change for chrome file picker
         //    console.log('chrome');
         // } else {
         const fileList = event.target.files;
         console.log(fileList);
         const arrayFiles = parseToArray(fileList);
         if (arrayFiles.length === 0) {
            alert(
               'No files found in the selected folder. Please select and upload  folder with files.'
            );
            return;
         }

         const arrayWithOutDuplicateURL = eliminateDuplicateURL(arrayFiles);

         const [finalStructure, highestId] = buildStructure(
            arrayWithOutDuplicateURL,
            context.highestId
         );
         setContext({ folders: finalStructure, highestId: highestId });
      }
   }
   return useShowDirectoryPicker ? (
      <>
         <input
            id="file"
            className={style.inputSelectLanguage}
            type="file"
            webkitdirectory="true"
            multiple
            onChange={handleImportFolder}
         />
         <label htmlFor="file" className={style.labelSelectLanguage}>
            {children}
         </label>
      </>
   ) : (
      <>
         <input
            id="file"
            className={style.inputSelectLanguage}
            type="file"
            webkitdirectory="true"
            multiple
            onChange={handleImportFolder}
         />
         <label htmlFor="file" className={style.labelSelectLanguage}>
            {children}
         </label>
      </>
   );
}
