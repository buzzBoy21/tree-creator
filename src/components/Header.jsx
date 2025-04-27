import { useBrowserDetection } from '../hook/useBrowserDetection';
import style from './header.module.css';
import { ImportFolders } from './importFolder/ImportFolders';
import logo from './../assets/logo.svg';
import {
   Button,
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   DrawerHeader,
   DrawerBody,
   useDisclosure,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import hamburger from './../assets/hamburger.svg';

export function Header({ handleMoreInfoButton = () => {}, handleConfigButton = () => {} }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = useRef();
   //return true if navigator is edge, chrome or opera
   const canIuseShowDirectoryPicker = useBrowserDetection();
   function handleButtonBestPractices() {
      //there is a bug in Chackra -ui which does strange behavior in the drawer's scroll along with  the sidebar -> solution close the sidebar before that client presses the close button of drawer
      handleMoreInfoButton();
      onClose();
   }

   /*************  ✨ Windsurf Command ⭐  *************/
   /**
    * Function which closes the sidebar before the drawer is closed, this is a hack because of a bug in Chackra-ui
    * @function
    * @param {function} handleConfigButton - function which opens the sidebar
    * @param {function} onClose - function which closes the drawer
    */
   /*******  fa9fe4ad-880a-41a0-b6e2-06638b82878b  *******/
   function handleButtonConfiguration() {
      //there is a bug in Chackra -ui which does strange behavior in the drawer's scroll along with  the sidebar -> solution close the sidebar before that client presses the close button of drawer
      handleConfigButton();
      onClose();
   }
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
            <Button colorScheme="gray" variant="outline" onClick={handleConfigButton} ref={btnRef}>
               Config
            </Button>

            <button onClick={onOpen} className={style.hamburger}>
               <img src={hamburger} alt="menu icon" style={{ height: '2em', width: 'auto' }} />
            </button>
         </div>
         <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Menu</DrawerHeader>

               <DrawerBody display={'flex'} flexDirection={'column'} gap={'2em'}>
                  <ImportFolders useShowDirectoryPicker={canIuseShowDirectoryPicker}>
                     Import Folders
                  </ImportFolders>
                  <Button colorScheme="gray" variant="outline" onClick={handleButtonBestPractices}>
                     Best Practices
                  </Button>
                  <Button
                     colorScheme="gray"
                     variant="outline"
                     onClick={handleButtonConfiguration}
                     ref={btnRef}>
                     Config
                  </Button>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </header>
   );
}
