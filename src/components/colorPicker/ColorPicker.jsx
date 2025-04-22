import { forwardRef, useState } from 'react';
import {
   Slider,
   SliderFilledTrack,
   SliderThumb,
   SliderTrack,
   SliderMark,
   Tooltip,
} from '@chakra-ui/react';

const ColorPicker = forwardRef(function ColorPicker({ defaultValue, onChange, value }, ref) {
   const [colorAndAlpha, setColorAndAlpha] = useState(defaultValue);
   const [showTooltip, setShowTooltip] = useState(false);
   let timeoutId = null;

   const handleChange = (value) => {
      setColorAndAlpha((prev) => ({ ...prev, color: value }));

      if (timeoutId) {
         clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
         onChange({ ...colorAndAlpha, color: value });
      }, 300);
   };
   const handleChangeAlpha = (value) => {
      setColorAndAlpha((prev) => ({ ...prev, alpha: value.toString(16) }));

      onChange({ ...colorAndAlpha, alpha: value.toString(16) });
   };
   return (
      <div style={{ width: '100vw', display: 'flex', gap: '1rem' }}>
         <input
            style={{
               width: '2.5em',
               height: '2.5em',
               borderRadius: '0.375rem',
               padding: '0.2em',
               backgroundColor: 'transparent',
               border: '1px solid rgb(226, 232, 240)',
               display: 'inline',
            }}
            ref={ref}
            type="color"
            defaultValue={colorAndAlpha.color}
            value={colorAndAlpha.color}
            onChange={(value) => {
               handleChange(value.target.value);
            }}
         />
         <div style={{ flexGrow: 1 }}>
            <p style={{ fontSize: '0.7em' }}>Alpha</p>
            <Slider
               id="slider"
               defaultValue={parseInt(colorAndAlpha.alpha, 16)}
               min={0}
               max={255}
               colorScheme="teal"
               onChange={(v) => handleChangeAlpha(v)}
               onMouseEnter={() => setShowTooltip(true)}
               onMouseLeave={() => setShowTooltip(false)}
               value={parseInt(colorAndAlpha.alpha, 16)}>
               <SliderMark value={63.75} mt="1" ml="-2.5" fontSize="sm">
                  25%
               </SliderMark>
               <SliderMark value={127.5} mt="1" ml="-2.5" fontSize="sm">
                  50%
               </SliderMark>
               <SliderMark value={191.25} mt="1" ml="-2.5" fontSize="sm">
                  75%
               </SliderMark>
               <SliderTrack>
                  <SliderFilledTrack />
               </SliderTrack>
               <Tooltip
                  hasArrow
                  bg="teal.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${parseInt(colorAndAlpha.alpha, 16)}`}>
                  <SliderThumb />
               </Tooltip>
            </Slider>
         </div>
      </div>
   );
});

export default ColorPicker;
