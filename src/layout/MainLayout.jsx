import HelpModal from './../components/helpModal/HelpModal';
import { OutPut } from './../components/outPut/OutPut';
import ConfigurationProvider from './../context/ConfigurationContext';
import ConfigModal from './../components/ConfigModal/ConfigModal';
import style from './../App.module.css';
import { EditTree } from './../components/editTree/EditTree';
import { Header } from './../components/Header';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

function MainLayout() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const {
      isOpen: isOpenHelpModal,
      onOpen: onOpenHelpModal,
      onClose: onCloseHelpModal,
   } = useDisclosure();

   const [openConfigModal, setOpenConfigModal] = useState(false);
   const [openHelpModal, setOpenHelpModal] = useState(false);
   return (
      <>
         <Header handleMoreInfoButton={onOpenHelpModal} handleConfigButton={onOpen} />
         <div className={style.containerPage}>
            <EditTree></EditTree>
            <ConfigurationProvider>
               <OutPut></OutPut>
               <ConfigModal isOpen={isOpen} onClose={onClose}></ConfigModal>
            </ConfigurationProvider>
            <HelpModal isOpen={isOpenHelpModal} onClose={onCloseHelpModal}></HelpModal>
         </div>
      </>
   );
}

export default MainLayout;
