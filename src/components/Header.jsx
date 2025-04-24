import { useBrowserDetection } from '../hook/useBrowserDetection';
import style from './header.module.css';
import { ImportFolders } from './importFolder/ImportFolders';
import logo from './../assets/logo.svg';
import { Button } from '@chakra-ui/react';
export function Header({ handleMoreInfoButton = () => {}, handleConfigButton = () => {} }) {
   //return true if navigator is edge, chrome or opera
   const canIuseShowDirectoryPicker = useBrowserDetection();
   return (
      <header className={style.header}>
         <img src={logo} alt="brand logo" style={{ height: '2em', width: 'auto' }} />
         <div className={style.mainPart}>
            <ImportFolders useShowDirectoryPicker={canIuseShowDirectoryPicker}>
               Import Folders
            </ImportFolders>
            <Button colorScheme="gray" variant="outline" onClick={handleMoreInfoButton}>
               Best Practices
            </Button>
            <Button colorScheme="gray" variant="outline" onClick={handleConfigButton}>
               Config
            </Button>
         </div>
      </header>
   );
}
