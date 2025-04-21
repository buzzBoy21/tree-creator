export function makeOutPut(
   folderStructure,
   identation = '',
   tabulationPerFolder,
   showFolderSlash,
   indicateCommentWith,
   maxLineLength
) {
   let result = '';
   // parser all atributtes to use in recursivity

   folderStructure.forEach((folder, index) => {
      const ArraylenghtFolders = folderStructure.length;
      let cubit = '';
      if (ArraylenghtFolders - 1 === index) {
         cubit = identation + '└──';
      } else {
         cubit = identation + '├──';
      }
      const allLineWithName = cubit + folder.name + showFolderSlash;
      result += allLineWithName;
      if (folder.description) {
         const eachLine = splitTextByLength(folder.description, maxLineLength).split('\n');
         // const eachLine = folder.description.split('\n');
         result += indicateCommentWith + eachLine[0] + '\n';
         for (let i = 1; i < eachLine.length; i++) {
            result +=
               generateIndentation(
                  identation,
                  ArraylenghtFolders,
                  tabulationPerFolder,
                  index,
                  allLineWithName.length + indicateCommentWith.length, //to know how many space I should after last vertical line
                  folder.childrens.length > 0,
                  folder.name,
                  indicateCommentWith.length
               ) +
               eachLine[i] +
               '\n';
         }
      } else {
         result += '\n';
      }
      if (folder.childrens.length > 0) {
         const newIdentation =
            identation +
            (index === ArraylenghtFolders - 1
               ? tabulationPerFolder.withOutLine
               : tabulationPerFolder.withLine);
         result += makeOutPut(
            folder.childrens,
            newIdentation,
            tabulationPerFolder,
            showFolderSlash,
            indicateCommentWith,
            maxLineLength
         );
      }
   });
   return result;
}

function generateLinesOfComments(comment, maxComment) {
   const lines = Math.ceil(comment.length / maxComment);
   for (let i = 0; i < lines; i++) {
      result.push(comment.slice(i * maxComment, (i + 1) * maxComment));
   }
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
   hasChildren
) {
   console.log('hasChildren', hasChildren);

   const result =
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
           ));
   return result;
}

const repeatCharacter = (character, times) => {
   if (times <= 0) {
      return '';
   }
   return character.repeat(times);
};
function splitTextByLength(text, length) {
   // const result = [];
   // for (let i = 0; i < text.length; i += length) {
   //    result.push(text.slice(i, i + length));
   // }
   // return result;
   return text.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, 'g'), '$1\n');
}
