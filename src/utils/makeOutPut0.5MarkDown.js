export function makeOutPut0_5markDown(
   folderStructure,
   identation = '',
   tabulationPerFolder,
   showFolderSlash,
   showComment,
   indicateCommentWith,
   maxLineLength,
   colorComment,
   colorBranch,
   folderColor,
   slashColor
) {
   let result = '';
   // parser all atributtes to use in recursivity

   folderStructure.forEach((folder, index) => {
      const ArraylenghtFolders = folderStructure.length;
      let cubit = '';
      if (ArraylenghtFolders - 1 === index) {
         cubit =
            `<span style="color:${colorBranch};text-wrap: nowrap">` +
            identation +
            '└──' +
            '</span>';
      } else {
         cubit =
            `<span style="color:${colorBranch};text-wrap: nowrap">` +
            identation +
            '├──' +
            '</span>';
      }
      const allLineWithName =
         cubit +
         `<span style="color:${folderColor};text-wrap: nowrap">` +
         folder.name +
         '</span>' +
         `<span style="color:${slashColor};text-wrap: nowrap">` +
         showFolderSlash +
         '</span>';

      result += allLineWithName;
      const lineWithOutTags = identation + '├──' + folder.name + showFolderSlash; //To calculate the length of the line with folder name and the slash

      if (folder.description && showComment) {
         const eachLine = splitTextByLength(folder.description, maxLineLength).split('\n');
         // const eachLine = folder.description.split('\n');
         result +=
            `<span style="color:${colorComment};text-wrap: nowrap">` +
            indicateCommentWith +
            eachLine[0] +
            '\n' +
            '</span>';
         for (let i = 1; i < eachLine.length; i++) {
            result +=
               generateIndentation(
                  identation,
                  ArraylenghtFolders,
                  tabulationPerFolder,
                  index,
                  lineWithOutTags.length + indicateCommentWith.length, //to know how many space I should after last vertical line
                  folder.children.length > 0,
                  colorBranch
               ) +
               `<span style="color:${colorComment};text-wrap: nowrap">` +
               eachLine[i] +
               '</span>' +
               '\n';
         }
      } else {
         result += '\n';
      }
      if (folder.children.length > 0) {
         const newIdentation =
            identation +
            (index === ArraylenghtFolders - 1
               ? tabulationPerFolder.withOutLine
               : tabulationPerFolder.withLine);
         result += makeOutPut0_5markDown(
            folder.children,
            newIdentation,
            tabulationPerFolder,
            showFolderSlash,
            showComment,
            indicateCommentWith,
            maxLineLength,
            colorComment,
            colorBranch,
            folderColor,
            slashColor
         );
      }
   });
   return result;
}

/**
 *
 * @param {*} identation
 * @param {*} ArraylenghtFolders
 * @param {*} tabulationPerFolder
 * @param {*} index
 * @param {*} spaceLength Is the empty space just before of the comment
 * @returns
 */
function generateIndentation(
   indentation,
   ArraylenghtFolders,
   tabulationPerFolder,
   index,
   spaceLength,
   hasChildren,
   colorBranch
) {
   const result =
      `<span style="color:${colorBranch};text-wrap: nowrap">` +
      indentation +
      (index === ArraylenghtFolders - 1
         ? tabulationPerFolder.withOutLine
         : tabulationPerFolder.withLine) +
      (hasChildren
         ? // when there are children, I must add tabulation with line to make seen the tree
           '│' +
           repeatCharacter(
              ' ',
              spaceLength - indentation.length - tabulationPerFolder.withOutLine.length - 1
           )
         : //   ''
           repeatCharacter(
              ' ',
              spaceLength - indentation.length - tabulationPerFolder.withOutLine.length
           )) +
      '</span>';
   return result;
}

const repeatCharacter = (character, times) => {
   if (times <= 0) {
      return '';
   }
   return character.repeat(times);
};
function splitTextByLength(text, length) {
   return text.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, 'g'), '$1\n');
}
