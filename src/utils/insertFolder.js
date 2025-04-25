// import { useContext } from 'react';
// import { FoldersContext } from '../../context/FolderStructureContext';

// export function useInsertFolder(idParent) {
//    const [context, setContext] = useContext(FoldersContext);
//    let newFoldercontext = context.folders;
//    const newId = context.highestId++;

//    function findAndInsert(folderList, parentFolderId, newFolder) {
//       for (let folder of folderList) {
//          if (folder.folderId === parentFolderId) {
//             folder.children.push(newFolder);
//             return true; // Detenemos la búsqueda
//          }

//          if (folder.children.length > 0) {
//             const found = findAndInsert(folder.children, parentFolderId, newFolder);
//             if (found) return true; // Si ya lo encontramos, no seguimos buscando
//          }
//       }
//       return false; // No se encontró el folderId
//    }
//    const result = findAndInsert(newFoldercontext, idParent, {
//       folderId: newId,
//       name: 'palnuevaCarpeta',
//       description: 'Esta es la descripción',
//       children: [],
//    });
//    if (result) {
//       setContext({ folders: newFoldercontext, highestId: newId });
//    } else {
//       console.log('Something was wrong');
//    }
// }
export function findAndInsert(folderList, parentFolderId, newFolder) {
   for (let folder of folderList) {
      if (folder.folderId === parentFolderId) {
         folder.children.push(newFolder);
         return true;
      }

      if (folder.children.length > 0) {
         const found = findAndInsert(folder.children, parentFolderId, newFolder);
         if (found) return true;
      }
   }
   return false;
}
