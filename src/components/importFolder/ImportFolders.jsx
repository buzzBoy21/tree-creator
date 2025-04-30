import { Button, Spinner } from '@chakra-ui/react';
import style from './style.module.css';
import { parseToArray, eliminateDuplicateURL, buildStructure } from '../../utils/parseFolders';
import { useContext, useState, useTransition } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import LoadFolderStructure from './LoadFolderStructure';
export function ImportFolders({ useShowDirectoryPicker, children }) {
   const [context, setContext] = useContext(FoldersContext);
   const [filesToProcess, setFilesToProcess] = useState(null);
   const [isPending, startTransition] = useTransition(); // [isPending, startTransition]useTransition()
   function handleImportFolder(event) {
      // in the future change for chrome file picker useShowDirectoryPicker=true -> chrome picker
      if (useShowDirectoryPicker || !useShowDirectoryPicker) {
         const fileList = event.target.files;
         setFilesToProcess(fileList);
      }
   }

   return (
      useShowDirectoryPicker ||
      (!useShowDirectoryPicker && (
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
               {/* {isPending && <Spinner />} */}
            </label>
            {filesToProcess && (
               <LoadFolderStructure
                  files={filesToProcess}
                  doThis={(filesToProcess, highestId = context.highestId) => {
                     const arrayFiles = parseToArray(filesToProcess);
                     if (arrayFiles.length > 0) {
                        const [structure, id] = buildStructure(
                           eliminateDuplicateURL(arrayFiles),
                           highestId
                        );
                        setContext({ folders: structure, highestId: id });
                        setFilesToProcess(null); // reset files to not execute again. We can use also memorization
                     } else {
                        alert(
                           'No files found in the selected folder. Please select and upload  folder with files.'
                        );
                        setFilesToProcess(null);
                     }
                  }}
               />
            )}
         </>
      ))
   );
}
