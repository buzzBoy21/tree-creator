import style from './style.module.css';
import { useCallback, useContext, useEffect, useRef, useState, useTransition } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import Spinner from '../spinner/Spinner';
import { useWorker } from '../../hook/useWorker';
import { createResource } from '../../utils/createResource';

export function ImportFolders({ useShowDirectoryPicker, children }) {
   const [context, setContext] = useContext(FoldersContext);
   const [loadingFiles, setLoadingFiles] = useState(false);
   const [resource, setResource] = useState(null);
   const [runWorker] = useWorker();
   const resultRef = useRef(null);

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
         resultRef.current = {
            folders: result.structure,
            highestId: result.highestId,
         };
         setResource(null);
      } else {
         alert(
            'No files found in the selected folder. Please select and upload folder with files.'
         );
         setResource(null);
      }
      setLoadingFiles(false);
   }
   useEffect(() => {
      //to fix  Cannot update a component (FolderStructureContext) while rendering a different component
      if (resultRef.current !== null) {
         setContext(resultRef.current);
         resultRef.current = null;
      }
   }, [resultRef, resultRef.current]);

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
      </>
   );
}

export default ImportFolders;
