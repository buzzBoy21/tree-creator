import { buildStructure, eliminateDuplicateURL, parseToArray } from './parseFolders';

self.onmessage = (event) => {
   try {
      const highestId = event.data.highestId;
      const arrayFiles = parseToArray(event.data.filesToProcess);
      const filesWithoutDuplicatedURL = eliminateDuplicateURL(arrayFiles);
      const fileCount = filesWithoutDuplicatedURL.length;

      let completed = false;

      let [structure, id] = [[], 0];

      if (arrayFiles.length > 0) {
         [structure, id] = buildStructure(filesWithoutDuplicatedURL, highestId);
         completed = true;
      }
      postMessage({
         result: {
            structure: structure,
            highestId: id,
            fileCount: fileCount,
            completed: completed,
            criticError: false,
         },
         error: null,
      });
   } catch (error) {
      console.log(error.message, error.stack, error.name);
      console.log(error);
      postMessage({
         result: { structure: [], highestId: null, completed: false, criticError: true },
         error: true,
      });
   }
};
export default onmessage;
