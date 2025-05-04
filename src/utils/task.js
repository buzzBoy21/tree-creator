import { buildStructure, eliminateDuplicateURL, parseToArray } from './parseFolders';

self.onmessage = (event) => {
   try {
      const arrayFiles = parseToArray(event.data.filesToProcess);
      const highestId = event.data.highestId;
      //   console.log(arrayFiles, highestId);
      console.log('ejecuto');
      console.log(event.data);

      let completed = false;

      let [structure, id] = [[], 0];

      if (arrayFiles.length > 0) {
         [structure, id] = buildStructure(eliminateDuplicateURL(arrayFiles), highestId);
         completed = true;
      }
      postMessage({
         result: {
            structure: structure,
            highestId: id,
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
