export function updateComment(idFolder, folderStructure, newDescription) {
   console.log('updateComment', idFolder, folderStructure, typeof folderStructure);
   console.log(folderStructure.folders);
   folderStructure.forEach((element) => {
      if (element.folderId === idFolder) {
         element.description = newDescription;
         return true;
      } else if (element.childrens.length > 0) {
         updateComment(idFolder, element.childrens, newDescription);
      }
   });
}
