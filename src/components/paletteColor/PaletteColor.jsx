import { useEffect, useState } from 'react';
export default function PaletteColor({ colors, title, selectedColor, setSelectedColor }) {
   return (
      <div
         title={title}
         style={{
            ...{
               border: '1px solid rgb(221, 228, 236)',
               display: 'flex',
               height: '1.5rem',
            },
            ...(selectedColor === title && {
               boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
               transform: 'translateY(-0.3em)',
            }),
         }}
         onClick={() => setSelectedColor(title)}>
         <div
            style={{
               backgroundColor: colors.folderColor.color,
               width: '0.75rem',
               height: '100%',
            }}></div>
         <div
            style={{
               backgroundColor: colors.colorComment.color,
               width: '0.75rem',
               height: '100%',
            }}></div>
         <div
            style={{
               backgroundColor: colors.colorBackground.color,
               width: '0.75rem',
               height: '100%',
            }}></div>
         <div
            style={{
               backgroundColor: colors.colorBranch.color,
               width: '0.75rem',
               height: '100%',
            }}></div>
         <div
            style={{
               backgroundColor: colors.slashColor.color,
               width: '0.75rem',
               height: '100%',
            }}></div>
      </div>
   );
}
