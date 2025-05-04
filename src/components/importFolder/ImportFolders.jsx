import { Button } from '@chakra-ui/react';
import style from './style.module.css';
import { useCallback, useContext, useState, useTransition } from 'react';
import { FoldersContext } from '../../context/FolderStructureContext';
import LoadFolderStructure from './LoadFolderStructure';
import Spinner from '../spinner/Spinner';
import WorkerConstructor from './../../utils/task.js?worker';
import { useWorker } from '../../hook/useWorker';
import { createResource } from '../../utils/createResource';
export function ImportFolders({ startTransition, useShowDirectoryPicker, children }) {
   const [context, setContext] = useContext(FoldersContext);
   // const [filesToProcess, setFilesToProcess] = useState(null);
   const [loadingFiles, setLoadingFiles] = useState(false);
   const [resource, setResource] = useState(null);
   const [runWorker] = useWorker();
   const handleImportFolder = (event) => {
      setLoadingFiles(true);

      startTransition(() => {
         const fileList = event.target.files;
         // setFilesToProcess(fileList);
         processFiles(fileList);
      });
   };

   const processFiles = useCallback(
      (files) => {
         // const worker = new WorkerConstructor();

         // worker.onmessage = (event) => {
         //    if (event.data.completed) {
         //       setContext({
         //          folders: event.data.structure,
         //          highestId: event.data.highestId,
         //       });
         //    } else {
         //       alert(
         //          'No files found in the selected folder. Please select and upload folder with files.'
         //       );
         //    }

         //    // Importante: limpiar los archivos después de procesarlos
         //    setFilesToProcess(null);
         //    worker.terminate();
         // };

         // worker.postMessage({
         //    filesToProcess: files,
         //    highestId: context.highestId,
         // });
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
         <label htmlFor="file" className={style.labelSelectLanguage}>
            {children}
            {loadingFiles && <Spinner />}
         </label>

         {/* {filesToProcess && <LoadFolderStructure files={filesToProcess} doThis={processFiles} />} */}
         {/* {filesToProcess && <LoadFolderStructure resource={runWorker} />} */}
      </>
   );
}

export default ImportFolders;
