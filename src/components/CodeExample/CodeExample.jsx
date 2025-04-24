import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Estilos de Prism
import 'prismjs/components/prism-markdown.js'; // Plugin Markdown
import './../../utils/prism/prism.css';
import miniCopySVG from './../../assets/mini-copy.svg';
import styles from './CodeExample.module.css';
import { span } from 'framer-motion/client';

function CodeExample({ children, size = 'm' }) {
   const codeRef = useRef(null);
   const [isCopied, setIsCopied] = useState(false);
   const fontSize = size === 'm' ? '1em' : size === 's' ? '0.82em' : '1.5em';
   useEffect(() => {
      if (codeRef.current) {
         Prism.highlightElement(codeRef.current);
      }
   }, []);

   const copyToClipboard = () => {
      if (codeRef.current) {
         navigator.clipboard
            .writeText(codeRef.current.textContent)
            .then(() => {
               setIsCopied(true);
               setTimeout(() => {
                  setIsCopied(false);
               }, 1000);
            })
            .catch((err) => {
               console.error('Failed to copy code: ', err);
            });
      }
   };
   return (
      <div style={{ position: 'relative', boxSizing: 'border-box' }}>
         <pre className={styles.codeBlock}>
            <code
               className={'language-markdown'}
               ref={codeRef}
               style={{ display: 'block', fontSize: fontSize }}>
               {children}
            </code>
         </pre>
         <button className={styles.copyButton} onClick={copyToClipboard}>
            {isCopied && <span>✅</span>}
            <img src={miniCopySVG} alt="copy code image" />
         </button>
      </div>
   );
}

export default CodeExample;
