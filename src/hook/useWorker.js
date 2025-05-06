import { useEffect, useRef } from 'react';
import CustomWorker from '../utils/importFolderTask.js?worker';
export function useWorker() {
   const workerRef = useRef(null);

   useEffect(() => {
      // Initialize worker
      workerRef.current = new CustomWorker();
      return () => {
         // Cleanup
         workerRef.current.terminate();
      };
   }, []);

   const runWorker = (valueToProcess) => {
      return new Promise((resolve, reject) => {
         const worker = workerRef.current;
         if (!worker) {
            reject(new Error('Worker not initialized'));
            return;
         }

         const handleMessage = (e) => {
            const { result, error } = e.data;
            if (error) {
               reject(new Error(error));
            } else {
               resolve(result);
            }
            cleanup();
         };

         const handleError = (e) => {
            reject(e.error || new Error('Worker error'));
            cleanup();
         };

         const cleanup = () => {
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
         };

         worker.addEventListener('message', handleMessage);
         worker.addEventListener('error', handleError);

         // Post data to worker
         worker.postMessage(valueToProcess);
      });
   };

   return [runWorker];
}
