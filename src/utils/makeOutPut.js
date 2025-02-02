export function makeOutPut(folderStructure, identation = '') {
   let result = '';
   folderStructure.forEach((folder, index) => {
      const ArraylenghtFolders = folderStructure.length;
      let cubit = '';
      if (ArraylenghtFolders - 1 === index) {
         cubit = identation + '└──';
      } else {
         cubit = identation + '├──';
      }
      const allLineWithName = cubit + folder.name + '/\n';
      result += allLineWithName;
      if (folder.description) {
         result += identation + '    -> ' + folder.description + '\n';
      }
      if (folder.childrens.length > 0) {
         const newIdentation = identation + (index === ArraylenghtFolders - 1 ? '    ' : '│   ');
         result += makeOutPut(folder.childrens, newIdentation);
      }
   });
   return result;
}
