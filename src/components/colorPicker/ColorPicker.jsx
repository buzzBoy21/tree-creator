import { forwardRef, useState } from 'react';

const ColorPicker = forwardRef(function ColorPicker({ defaultValue, onChange, value }, ref) {
   const [color, setColor] = useState(defaultValue);
   let timeoutId = null;

   const handleChange = (value) => {
      setColor(value);

      if (timeoutId) {
         clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
         onChange(value);
      }, 300);
   };
   return (
      <input
         style={{
            width: '2.5em',
            height: '2.5em',
            borderRadius: '0.375rem',
            padding: '0.2em',
            backgroundColor: 'transparent',
            border: '1px solid rgb(226, 232, 240)',
         }}
         ref={ref}
         type="color"
         defaultValue={color}
         value={value}
         onChange={(value) => {
            handleChange(value.target.value);
         }}
      />
   );
});

export default ColorPicker;
