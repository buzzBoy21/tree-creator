import HelpModal from './../components/helpModal/HelpModal';
import { OutPut } from './../components/outPut/OutPut';
import ConfigurationProvider from './../context/ConfigurationContext';
import ConfigModal from './../components/ConfigModal/ConfigModal';
import style from './../App.module.css';
import { EditTree } from './../components/editTree/EditTree';
import { Header } from './../components/Header';
import { Suspense, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import EditTreeSkeleton from '../components/skeletons/EditTreeSkeleton';
import { OutPutSkeleton } from '../components/skeletons/OutPutSkeleton';
function MainLayout() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const {
      isOpen: isOpenHelpModal,
      onOpen: onOpenHelpModal,
      onClose: onCloseHelpModal,
   } = useDisclosure();

   return (
      <>
         <ConfigurationProvider>
            <Suspense
               fallback={
                  <>
                     <Header handleMoreInfoButton={onOpenHelpModal} handleConfigButton={onOpen} />

                     <div className={style.containerPage}>
                        <EditTreeSkeleton></EditTreeSkeleton>
                        <OutPutSkeleton></OutPutSkeleton>
                     </div>
                  </>
               }>
               <Header handleMoreInfoButton={onOpenHelpModal} handleConfigButton={onOpen} />

               <div className={style.containerPage}>
                  <EditTree></EditTree>
                  <OutPut></OutPut>
                  {/* <EditTreeSkeleton></EditTreeSkeleton>
                  <OutPutSkeleton></OutPutSkeleton> */}
                  <ConfigModal isOpen={isOpen} onClose={onClose}></ConfigModal>
                  <HelpModal isOpen={isOpenHelpModal} onClose={onCloseHelpModal}></HelpModal>
               </div>
            </Suspense>
         </ConfigurationProvider>
      </>
   );
}

export default MainLayout;
