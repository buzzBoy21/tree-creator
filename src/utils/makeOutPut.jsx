import React from 'react';

export function makeOutPut(
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
   let result = [];
   // parser all attributes to use in recursion
   folderStructure.forEach((folder, index) => {
      const ArraylenghtFolders = folderStructure.length;
      let cubit = '';
      if (ArraylenghtFolders - 1 === index) {
         cubit = (
            <>
               <span style={{ color: colorBranch }}>{identation}└──</span>
            </>
         );
      } else {
         cubit = (
            <>
               <span style={{ color: colorBranch }}>{identation}├──</span>
            </>
         );
      }
      const allLineWithName = (
         <>
            <span style={{ color: folderColor }}>
               {cubit}
               {folder.name}
            </span>
            <span style={{ color: slashColor }}>{showFolderSlash}</span>
         </>
      );
      result.push(allLineWithName);

      const lineWithOutTags = identation + '├──' + folder.name + showFolderSlash; //To calculate the length of the line with folder name and the slash

      if (folder.description && showComment) {
         const eachLine = splitTextByLength(folder.description, maxLineLength).split('\n');
         result.push(
            <>
               <pre style={{ color: colorComment, display: 'inline', fontFamily: 'monospace' }}>
                  {indicateCommentWith}
                  {eachLine[0]}
               </pre>
               <br />
            </>
         );
         for (let i = 1; i < eachLine.length; i++) {
            result.push(
               <>
                  {generateIndentation(
                     identation,
                     ArraylenghtFolders,
                     tabulationPerFolder,
                     index,
                     lineWithOutTags.length + indicateCommentWith.length, // to know how many spaces I should add after the last vertical line
                     folder.children.length > 0,
                     colorBranch,
                     colorComment
                  )}

                  <pre style={{ color: colorComment, display: 'inline', fontFamily: 'monospace' }}>
                     {eachLine[i]}
                  </pre>
                  <br />
               </>
            );
         }
      } else {
         result.push(<br />);
      }
      if (folder.children.length > 0) {
         const newIdentation =
            identation +
            (index === ArraylenghtFolders - 1
               ? tabulationPerFolder.withOutLine
               : tabulationPerFolder.withLine);
         result.push(
            makeOutPut(
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
            )
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
 * @param {*} spaceLength Is the empty space just before the comment
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
   const result = (
      <>
         <span style={{ color: colorBranch }}>{indentation}</span>
         {index === ArraylenghtFolders - 1 ? (
            <span style={{ color: colorBranch }}>{tabulationPerFolder.withOutLine}</span>
         ) : (
            <span style={{ color: colorBranch }}>{tabulationPerFolder.withLine}</span>
         )}
         {hasChildren ? (
            <>
               <span style={{ color: colorBranch }}>
                  │
                  {repeatCharacter(
                     '\u00A0',
                     spaceLength - indentation.length - tabulationPerFolder.withOutLine.length - 1
                  )}
               </span>
            </>
         ) : (
            <span>
               <>
                  {repeatCharacter(
                     '\u00A0',
                     spaceLength - indentation.length - tabulationPerFolder.withOutLine.length
                  )}
               </>
            </span>
         )}
      </>
   );
   return result;
}

const repeatCharacter = (character, times) => {
   if (times <= 0) {
      return '';
   }

   const characters = Array(times).fill(character);
   return characters.map((char, index) =>
      React.createElement(
         'span',
         { key: index, style: { display: 'inline', fontFamily: 'monospace' } },
         char
      )
   );
};

function splitTextByLength(text, length) {
   return text.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, 'g'), '$1\n');
}
