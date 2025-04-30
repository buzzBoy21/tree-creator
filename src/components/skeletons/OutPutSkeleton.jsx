import { useContext, useEffect, useState } from 'react';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import { Button } from '@chakra-ui/react';
import style from './../outPut/outPut.module.css';
import LineSkeleton from './LineSkeleton';

function hexToRGBA(hex) {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result
      ? {
           r: parseInt(result[1], 16),
           g: parseInt(result[2], 16),
           b: parseInt(result[3], 16),
           a: parseInt(result[4], 16) / 255, // transparencia como valor entre 0 y 1
        }
      : null;
}

function getRelativeLuminance(color) {
   const r = color.r / 255;
   const g = color.g / 255;
   const b = color.b / 255;
   const a = color.a; // valor de transparencia (alpha)
   const L_fondo = 1; // luminancia relativa del color de fondo (blanco puro)
   return (0.2126 * r + 0.7152 * g + 0.0722 * b) * a + (1 - a) * L_fondo;
}
function getContrastRatio(color1, color2) {
   const L1 = getRelativeLuminance(color1);
   const L2 = getRelativeLuminance(color2);
   return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05) < 0.45 ? true : false;
}

export function OutPutSkeleton() {
   const [configurationContext] = useContext(ConfigurationContext);
   const mainBackgroundColor = { r: 100, g: 100, b: 100, a: 0.5 };
   const [backgroundIsDark, setBackgroundIsDark] = useState(
      getContrastRatio(
         mainBackgroundColor,
         hexToRGBA(
            configurationContext.colorBackground.color + configurationContext.colorBackground.alpha
         )
      )
   );
   useEffect(() => {
      setBackgroundIsDark(
         getContrastRatio(
            mainBackgroundColor,
            hexToRGBA(
               configurationContext.colorBackground.color +
                  configurationContext.colorBackground.alpha
            )
         )
      );
   }, [configurationContext]);
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
         <>
            <div className={style.copyContainer}>
               <Button
                  display={'block'}
                  padding={'0.5em'}
                  aspectRatio={'1/1'}
                  height={'3em'}
                  marginBottom={'1em'}></Button>
               <Button
                  display={'block'}
                  padding={'0.5em'}
                  aspectRatio={'1/1'}
                  height={'3em'}
                  marginBottom={'1em'}></Button>
               <Button
                  display={'block'}
                  padding={'0.5em'}
                  aspectRatio={'1/1'}
                  height={'3em'}></Button>
            </div>
            <div
               className={style.onlyText}
               style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
               <LineSkeleton backgroundIsDark={backgroundIsDark} endAt={'30%'} align={'left'} />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'15%'}
                  endAt={'35%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'30%'}
                  endAt={'45%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'30%'}
                  endAt={'30%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'30%'}
                  endAt={'60%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'15%'}
                  endAt={'50%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'30%'}
                  endAt={'20%'}
                  align={'left'}
               />
               <LineSkeleton
                  backgroundIsDark={backgroundIsDark}
                  startAt={'30%'}
                  endAt={'47%'}
                  align={'left'}
               />
            </div>
         </>
      </div>
   );
}
