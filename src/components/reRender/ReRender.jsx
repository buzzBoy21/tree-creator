import { useEffect, useState } from 'react';

/**
 * This component ensures that its children are rendered only after the initial render.
 * It uses a state variable 'rendered' to track whether the component has mounted.
 */
function ReRender({ children }) {
   const [rendered, setRendered] = useState(false);

   useEffect(() => {
      setRendered(true);
   }, []);

   // If not rendered y
   if (!rendered) {
      return null;
   }

   return <div key={rendered}>children</div>;
}

export default ReRender;
