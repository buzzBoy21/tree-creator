import { useContext, useEffect, useState, useTransition, useRef, useLayoutEffect } from 'react';
import style from './outPut.module.css';
import { FoldersContext } from '../../context/FolderStructureContext';
import { makeOutPut } from '../../utils/makeOutPut.jsx';
import { Button } from '@chakra-ui/react';
import copyTextIcon from '../../assets/copy-text.svg';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import { Spinner } from '@chakra-ui/react';
import cameraIcon from './../../assets/camera.svg';
import html2canvas from 'html2canvas';
import { makeOutPut0_5 } from '../../utils/makeOutPut0.5.js';
import { time } from 'framer-motion/client';

export default function OutPut() {
   const [context, seContext] = useContext(FoldersContext);
   const [configurationContext, setConfigurationContext] = useContext(ConfigurationContext);
   const [outPutText, setOutPutText] = useState('');
   const [isPending, startTransition] = useTransition();
   const [isTakingPicture, setIsTakingPicture] = useState(false);
   const onlyOutPutRef = useRef(null);
   useEffect(() => {
      const commentColor = configurationContext.colorComment.color.concat(
         configurationContext.colorComment.alpha.length < 2
            ? '0' + configurationContext.colorComment.alpha
            : configurationContext.colorComment.alpha
      );
      const branchColor = configurationContext.colorBranch.color.concat(
         configurationContext.colorBranch.alpha.length < 2
            ? '0' + configurationContext.colorBranch.alpha
            : configurationContext.colorBranch.alpha
      );
      startTransition(() => {
         const outPut = makeOutPut(
            context.folders,
            configurationContext.indentation,

            configurationContext.tabulationPerFolder,
            configurationContext.showFolderSlash,
            configurationContext.indicateCommentWith,
            configurationContext.maxCommentWidth,
            commentColor,
            branchColor
         );
         setOutPutText(outPut);
      });
   }, [context, configurationContext]);

   const copyToClipboard = () => {
      const outPutWithOutColor =
         '```' +
         makeOutPut0_5(
            context.folders,
            configurationContext.indentation,

            configurationContext.tabulationPerFolder,
            configurationContext.showFolderSlash,
            configurationContext.indicateCommentWith,
            configurationContext.maxCommentWidth
         ) +
         '```';

      navigator.clipboard
         .writeText(outPutWithOutColor)
         .then(() => {
            alert('Text copied to clipboard!');
         })
         .catch((err) => {
            console.error('Failed to copy text: ', err);
         });
   };
   const createCanvasAndPrint = () => {
      html2canvas(onlyOutPutRef.current, {
         backgroundColor: `${configurationContext.colorBackground.color}${
            configurationContext.colorBackground.alpha.length < 2
               ? '0' + configurationContext.colorBackground.alpha
               : configurationContext.colorBackground.alpha
         }`,
      }).then((canvas) => {
         // document.body.appendChild(canvas);
         const img = canvas.toDataURL('image/png');
         const link = document.createElement('a');
         link.href = img;
         link.download = 'tree-folder.png';

         link.click();
      });
   };

   console.log(isTakingPicture, 'setIsTakingPicture');
   return (
      <div
         className={style.container}
         style={{
            backgroundColor:
               configurationContext.colorBackground.color +
               (configurationContext.colorBackground.alpha.length < 2
                  ? '0' + configurationContext.colorBackground.alpha
                  : configurationContext.colorBackground.alpha),
         }}>
         {isPending ? (
            <Spinner />
         ) : (
            outPutText !== '' &&
            !isTakingPicture && (
               <>
                  <div className={style.copyContainer}>
                     <Button
                        display={'block'}
                        padding={'0.5em'}
                        aspectRatio={'1/1'}
                        height={'3em'}
                        onClick={createCanvasAndPrint}
                        marginBottom={'1em'}>
                        <img
                           src={cameraIcon}
                           alt="copy text"
                           title="copy all tree"
                           style={{ height: '2em' }}
                        />
                     </Button>
                     <Button
                        display={'block'}
                        padding={'0.5em'}
                        aspectRatio={'1/1'}
                        height={'3em'}
                        onClick={copyToClipboard}>
                        <img
                           src={copyTextIcon}
                           alt="copy text"
                           title="copy all tree"
                           style={{ height: '2em' }}
                        />
                     </Button>
                  </div>
                  <div className={style.onlyText} ref={onlyOutPutRef}>
                     {outPutText}
                  </div>
               </>
            )
         )}
      </div>
   );
}
