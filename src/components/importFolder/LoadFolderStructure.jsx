let resourceCache = null;

function createResource(promise) {
   let status = 'pending';
   let result;
   let suspender = promise.then(
      (res) => {
         status = 'success';
         result = res;
      },
      (err) => {
         status = 'error';
         result = err;
      }
   );

   //object with the his own function to execute the promise
   return {
      read() {
         if (status === 'pending') {
            console.log('suspende');

            throw suspender; // Aquí es donde React "suspende"
         } else if (status === 'error') {
            console.log('metido');
            throw result;
         } else if (status === 'success') {
            console.log('sale');
            return result;
         }
      },
   };
}
/**
 * Function to load the folder structure an throw a promise
 * @param {FileList} files a list of files
 * @param {Function} doThis a function to execute when the files are loaded
 * @returns {JSX.Element} a React component that shows a "hola a ver si estoy" message
 */
function LoadFolderStructure({ files, doThis }) {
   if (files) {
      resourceCache = createResource(
         new Promise((resolve) => {
            return setTimeout(() => {
               // setTimeout to generate delay to let react throw the promise
               doThis(files);
               resolve();
            }, 0);
         })
      );
   }

   resourceCache.read();

   return null;
}
export default LoadFolderStructure;
