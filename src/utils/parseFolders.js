export function parseToArray(filesObject) {
   return Object.values(filesObject).map((file) => {
      //eliminate the path's file name

      const relativePath = file.webkitRelativePath.split('/');
      const relativePathWithOutFileName = relativePath.slice(0, -1);
      return relativePathWithOutFileName;
   });
}
/**
 * This function is not pure (carefull)
 * @param {string[]} carpetas
 * @returns {string[]}
 * return the same array without unecessary url <br>
 *
 * Example:
 * if you have: car/bmw/z4 AND car/bwm -> this will delete car/bwm
 */
export function eliminateDuplicateURL(carpetas) {
   for (let principalIndex = 0; principalIndex < carpetas.length; principalIndex++) {
      const folder1 = carpetas[principalIndex];

      for (let folder2Index = principalIndex + 1; folder2Index < carpetas.length; folder2Index++) {
         const folder2 = carpetas[folder2Index];

         let MaxIndex = 0;
         let IndexShortedFolderURL = null;
         if (folder1.length === folder2.length) {
            //Is impasible that exist two folder with the same url
            continue;
         } else if (folder1.length > folder2.length) {
            MaxIndex = folder2.length;
            IndexShortedFolderURL = folder2Index;
         } else {
            MaxIndex = folder1.length;
            IndexShortedFolderURL = principalIndex;
         }

         let equalityFrequency = 0;
         for (let folderIndex = 0; folderIndex < MaxIndex; folderIndex++) {
            //compare folder's names
            if (folder1[folderIndex] === folder2[folderIndex]) {
               equalityFrequency++;

               //This occurs when the shorter folder's URL has the same folders as the longer folder's URL
               if (equalityFrequency === carpetas[IndexShortedFolderURL].length) {
                  carpetas.splice(IndexShortedFolderURL, 1);
                  principalIndex++;
               }

               //When is not the same the folders name
            } else {
               // dont continue this loop
               break;
            }
         }
      }
   }
   return carpetas;
}

export function buildStructure(paths, startId) {
   const root = [];
   let id = startId;
   function addPathToTree(path, node) {
      const [currentFolderName, ...rest] = path;
      let childNode = node.find((n) => n.name === currentFolderName);
      // when any folder haven't the currentFolderName folder's name
      //if exist the name:
      //1. the interperter will not go to if
      //2. As node.find return the finding node, the atributte childrens will pass to the addPashTotre (next if)
      if (!childNode) {
         childNode = { folderId: id++, name: currentFolderName, description: '', childrens: [] };
         node.push(childNode);
         //The push can be within empyty root or inside previus node (thanks to addPathToTree(rest, childNode.childrens) )
      }

      if (rest.length > 0) {
         //every time pass the array like the node
         addPathToTree(rest, childNode.childrens);
      }
   }

   paths.forEach((path) => addPathToTree(path, root));
   console.log(JSON.stringify(root, null, '\t'));
   return [root, id];
}
