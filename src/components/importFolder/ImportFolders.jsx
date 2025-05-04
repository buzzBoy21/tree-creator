import style from './style.module.css';
import { useCallback, useContext, useState, useTransition } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import Spinner from '../spinner/Spinner';
import { useWorker } from '../../hook/useWorker';
import { createResource } from '../../utils/createResource';

export function ImportFolders({ useShowDirectoryPicker, children }) {
   const [context, setContext] = useContext(FoldersContext);
   const [loadingFiles, setLoadingFiles] = useState(false);
   const [resource, setResource] = useState(null);
   const [runWorker] = useWorker();

   const handleImportFolder = (event) => {
      setLoadingFiles(true);

      const fileList = event.target.files;
      processFiles(fileList);
   };

   const processFiles = useCallback(
      (files) => {
         const promise = runWorker({
            filesToProcess: files,
            highestId: context.highestId,
         });
         const folderStructure = createResource(promise);
         setResource(folderStructure);
      },
      [context.highestId, setContext]
   );
   if (resource) {
      const result = resource.read();
      if (result.completed) {
         setContext({
            folders: result.structure,
            highestId: result.highestId,
         });
         setResource(null);
      } else {
         alert(
            'No files found in the selected folder. Please select and upload folder with files.'
         );
         setResource(null);
      }
      setLoadingFiles(false);
   }
   if (!useShowDirectoryPicker && useShowDirectoryPicker !== false) {
      return null;
   }

   return (
      <>
         <input
            id="file"
            className={style.inputSelectLanguage}
            type="file"
            webkitdirectory="true"
            multiple
            onChange={handleImportFolder}
         />
         <label htmlFor="file" className={style.labelSelectLanguage} title="it may take a while">
            {children}
            {loadingFiles && <Spinner />}
         </label>

         {/* {filesToProcess && <LoadFolderStructure files={filesToProcess} doThis={processFiles} />} */}
         {/* {filesToProcess && <LoadFolderStructure resource={runWorker} />} */}
      </>
   );
}

export default ImportFolders;
