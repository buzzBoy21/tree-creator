import ArrowButton from '../buttons/ArrowButton';
import style from './../folder/folder.module.css';
import { Button } from '@chakra-ui/react';
import folderSVG from '../../assets/folder.svg';
import binSvg from '../../assets/bin.svg';
import loadingStyle from './folderSkeleton.module.css';
import PhraseWithDots from './PhraseWithDots';
function FolderSkeleton() {
   return (
      <div
         className={[style.containerFolder, loadingStyle.containerFolder, style.shimmer].join(' ')}
         style={{ showMore: false, cssContainer: 'center', right: true, down: false }}>
         <div className={style.principalSection}>
            <ArrowButton right borderRadius="0%"></ArrowButton>
            <div className={style.nameAndLogo}>
               <img src={folderSVG} alt="folder icon" style={{ height: '1.6em' }} />
               <PhraseWithDots>Loading</PhraseWithDots>
            </div>
            <ul>
               <li>
                  <ArrowButton down borderRadius="100%"></ArrowButton>
               </li>

               <li>
                  <ArrowButton borderRadius="100%"></ArrowButton>
               </li>

               <li>
                  <Button colorScheme="whiteAlpha" variant="solid">
                     <img src={binSvg} alt="bin logo" style={{ height: '1.5em' }} />
                  </Button>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default FolderSkeleton;
