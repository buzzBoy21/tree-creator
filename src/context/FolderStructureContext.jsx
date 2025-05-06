import { useMemo, useState } from 'react';
import { createContext } from 'react';

export const FoldersContext = createContext();

export default function FolderStructureContext({ children }) {
   const [folderStructure, setFolderStructure] = useState({ folders: [], highestId: 1 });
   // const contextValue = useMemo(() => [folderStructure, setFolderStructure], [folderStructure]);
   return (
      <FoldersContext.Provider value={[folderStructure, setFolderStructure]}>
         {children}
      </FoldersContext.Provider>
   );
}
