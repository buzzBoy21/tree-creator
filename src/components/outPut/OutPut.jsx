import { useContext, useEffect, useState, useTransition } from 'react';
import style from './outPut.module.css';
import { FoldersContext } from '../../context/FolderStructureContext';
import { makeOutPut } from '../../utils/makeOutPut';
import { Button } from '@chakra-ui/react';
import copyTextIcon from '../../assets/copy-text.svg';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import { Spinner } from '@chakra-ui/react';
export default function OutPut() {
   const [context, seContext] = useContext(FoldersContext);
   const [configurationContext, setConfigurationContext] = useContext(ConfigurationContext);
   const [outPutText, setOutPutText] = useState('');
   const [isPending, startTransition] = useTransition();
   useEffect(() => {
      startTransition(() => {
         console.log('configurationContext', configurationContext);

         const outPut = makeOutPut(
            context.folders,
            configurationContext.indentation,

            configurationContext.tabulationPerFolder,
            configurationContext.showFolderSlash,
            configurationContext.indicateCommentWith,
            configurationContext.maxCommentWidth
         );
         console.log('outPut', outPut);
         setOutPutText(outPut);
      });
   }, [context, configurationContext]);

   const copyToClipboard = () => {
      navigator.clipboard
         .writeText(outPutText)
         .then(() => {
            alert('Text copied to clipboard!');
         })
         .catch((err) => {
            console.error('Failed to copy text: ', err);
         });
   };
   return (
      <div
         className={style.container}
         style={{ backgroundColor: configurationContext.colorBackground }}>
         {isPending ? (
            <Spinner />
         ) : (
            outPutText !== '' && (
               <>
                  <Button
                     padding={'0.5em'}
                     aspectRatio={'1/1'}
                     height={'3em'}
                     onClick={copyToClipboard}
                     position={'fixed'}
                     zIndex={100}
                     bottom={'2em'}
                     right={'2em'}>
                     <img
                        src={copyTextIcon}
                        alt="copy text"
                        title="copy all tree"
                        style={{ height: '2em' }}
                     />
                  </Button>
                  {outPutText}
               </>
            )
         )}
      </div>
   );
}
