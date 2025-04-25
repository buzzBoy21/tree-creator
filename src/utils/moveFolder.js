/**
 * This fuction is NOT pure
 * Eliminate the actually position of folder and add the folder in a new position
 * @param {int} folderId
 * @param {Object[]} folderStructure
 *
 */
export function moveFolderUp(folderId, folderStructure) {
   folderStructure.forEach((element, currentIndex) => {
      if (folderId === element.folderId) {
         //Create the object in a new position
         const previousIndex = currentIndex - 1;

         const temporalFolder = folderStructure[previousIndex];
         folderStructure[previousIndex] = folderStructure[currentIndex];
         folderStructure[currentIndex] = temporalFolder;

         return true;
      } else if (element.children.length > 0) {
         moveFolderUp(folderId, element.children);
      }
   });
}

/**
 * This fuction is NOT pure
 * Eliminate the actually position of folder and add the folder in a new position
 * @param {int} folderId
 * @param {Object[]} folderStructure
 *
 */
export function moveFolderDown(folderId, folderStructure) {
   console.log('idFolder', folderId);
   folderStructure.forEach((element, currentIndex) => {
      console.log('currentIndex', currentIndex);
      if (folderId === element.folderId) {
         console.log('dentro');

         const nextIndex = currentIndex + 1;
         if (nextIndex < folderStructure.length) {
            const temporalFolder = folderStructure[nextIndex];
            folderStructure[nextIndex] = folderStructure[currentIndex];
            folderStructure[currentIndex] = temporalFolder;
         }

         return true;
      } else if (element.children.length > 0) {
         moveFolderDown(folderId, element.children);
      }
   });
}
