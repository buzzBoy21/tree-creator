import { useContext, useState } from 'react';
import AddFolder from '../addFolder/AddFolder';
import ArrowButton from '../buttons/ArrowButton';
import style from './folder.module.css';
import { Button } from '@chakra-ui/react';
import folderSVG from '../../assets/folder.svg';
import binSvg from '../../assets/bin.svg';
import ChildrenFolders from '../childrenFolders/ChildrenFolders';
import { removeFolder } from '../../utils/removeFolder';
import { FoldersContext } from '../../context/FolderStructureContext';
import { moveFolderDown, moveFolderUp } from '../../utils/moveFolder';
export default function Folder({ idFolder, nameFolder, childrenFolders, brotherUp, brotherDown }) {
   const [name, setName] = useState(nameFolder);
   const [expand, setExpand] = useState({
      showMore: false,
      cssContainer: 'center',
      right: true,
      down: false,
   });

   const [context, setContext] = useContext(FoldersContext);

   function handleArrowButton() {
      if (expand.showMore) {
         setExpand({ showMore: false, cssContainer: 'center', right: true, down: false });
      } else {
         setExpand({ showMore: true, cssContainer: 'flex-start', right: false, down: true });
      }
   }
   function handleEliminate(idToEliminate) {
      const newContext = { folders: context.folders, highestId: context.highestId };
      removeFolder(idToEliminate, newContext.folders);
      setContext(newContext);
   }
   function handleUpButton() {
      const newFolders = context.folders;
      moveFolderUp(idFolder, newFolders);
      setContext({ folders: newFolders, highestId: context.highestId });
   }
   function handleDownButton() {
      const newFolders = context.folders;
      moveFolderDown(idFolder, newFolders);
      console.log(JSON.stringify(newFolders, null, '\t'));
      setContext({ folders: newFolders, highestId: context.highestId });
   }
   return (
      <div className={style.containerFolder} style={{ alignItems: expand.cssContainer }}>
         <div className={style.principalSection}>
            <ArrowButton
               right={expand.right}
               down={expand.down}
               onClick={() => handleArrowButton()}
               borderRadius="0%"></ArrowButton>
            <div className={style.nameAndLogo}>
               <img src={folderSVG} alt="folder icon" style={{ height: '1.6em' }} />
               <p>{name} </p>
            </div>
            <ul>
               {brotherDown && (
                  <li>
                     {' '}
                     <ArrowButton
                        down
                        onClick={() => handleDownButton()}
                        borderRadius="100%"></ArrowButton>
                  </li>
               )}
               {brotherUp && (
                  <li>
                     {' '}
                     <ArrowButton
                        onClick={() => handleUpButton()}
                        borderRadius="100%"></ArrowButton>
                  </li>
               )}

               <li>
                  <Button
                     colorScheme="gray"
                     variant="solid"
                     onClick={() => handleEliminate(idFolder)}>
                     {' '}
                     <img src={binSvg} alt="bin logo" style={{ height: '1.5em' }} />
                  </Button>
               </li>
            </ul>
         </div>
         <div className={style.bottomSection}>
            {expand.showMore && (
               <>
                  <ChildrenFolders folders={childrenFolders}></ChildrenFolders>{' '}
                  <AddFolder folderId={idFolder} />
               </>
            )}
         </div>
      </div>
   );
}
