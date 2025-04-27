import { useEffect, useState, useRef } from 'react';
import { palettesColors } from '../../assets/constants';
import PaletteColor from '../paletteColor/PaletteColor';
import { Button } from '@chakra-ui/react';
export default function PaletteColors({ onChange = () => {}, defaultValue, value }) {
   const [selectedColor, setSelectedColor] = useState(value);
   const containerRef = useRef(null);
   useEffect(() => {
      // If there isn't a custom color
      if (selectedColor !== '')
         onChange(
            palettesColors.find((color) => color.name === selectedColor).colors,
            selectedColor
         );
   }, [selectedColor]);

   //Have picked a custom color
   useEffect(() => {
      if (value === '') setSelectedColor('');
   }, [value]);
   //Have picked a custom color
   useEffect(() => {
      if (value === defaultValue) setSelectedColor(defaultValue);
   }, [value, defaultValue]);
   const handleScroll = (direction) => {
      const container = containerRef.current;
      if (container) {
         const scrollWidth = container.scrollWidth;
         const clientWidth = container.clientWidth;
         const currentScrollLeft = container.scrollLeft;

         if (direction === 'left') {
            container.scrollLeft = currentScrollLeft - clientWidth;
         } else if (direction === 'right') {
            container.scrollLeft = Math.min(
               currentScrollLeft + clientWidth,
               scrollWidth - clientWidth
            );
         }
      }
   };

   return (
      <div style={{ overflow: 'hidden' }}>
         <div
            style={{
               height: '2em',
               position: 'relative',
               display: 'flex',
               gap: '1rem',
               maxWidth: '100%',
               overflowX: 'hidden',
               overflowY: 'hidden',
               alignItems: 'flex-end',
               scrollBehavior: 'smooth',
            }}
            ref={containerRef}>
            {palettesColors.map((color, id) => (
               <PaletteColor
                  key={id}
                  colors={color.colors}
                  title={color.name}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
               />
            ))}
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
               padding={'0 0.5rem'}
               minHeight={0}
               minWidth={0}
               height={'2em'}
               colorScheme="gray"
               variant="outline"
               onClick={() => handleScroll('left')}>
               ←
            </Button>
            <Button
               padding={'0 0.5rem'}
               minHeight={0}
               minWidth={0}
               height={'2em'}
               colorScheme="gray"
               variant="outline"
               onClick={() => handleScroll('right')}>
               →
            </Button>
         </div>
      </div>
   );
}
