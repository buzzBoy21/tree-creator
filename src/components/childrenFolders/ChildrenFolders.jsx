import Folder from '../folder/Folder';

export default function ChildrenFolders({ folders }) {
   return folders.map((folder, position) => {
      const brotherUp = position !== 0;
      const brotherDown = position !== folders.length - 1;

      return (
         <Folder
            key={folder.folderId}
            idFolder={folder.folderId}
            nameFolder={folder.name}
            childrenFolders={folder.children}
            brotherUp={brotherUp}
            brotherDown={brotherDown}
         />
      );
   });
}
