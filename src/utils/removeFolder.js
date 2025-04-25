export function removeFolder(idFolder, folderStructure) {
   folderStructure.forEach((element, index) => {
      console.log(element);
      if (idFolder === element.folderId) {
         folderStructure.splice(index, 1);
         return true;
      }
      if (element.children.length > 0) removeFolder(idFolder, element.children);
   });
}
