export function createResource(promise) {
   let status = 'pending';
   let result;
   const suspender = promise
      .then((r) => {
         status = 'success';
         result = r;
      })
      .catch((e) => {
         status = 'error';
         result = e;
      });

   return {
      read() {
         if (status === 'pending') throw suspender;
         if (status === 'error') throw result;
         return result;
      },
   };
}
