import { Button, Textarea } from '@chakra-ui/react';
import style from './style.module.css';
import { useContext, useEffect, useRef, useState, useTransition } from 'react';
import enterSvg from './../../assets/enter.svg';
import { use } from 'react';
import Spinner from '../spinner/Spinner';
import { FoldersContext } from '../../context/FolderStructureContext';
function CommentInput({ onChange = () => {}, max }) {
   const [folderContext] = useContext(FoldersContext);

   const textAreaRef = useRef(null);
   const valueHasChangedAfterSave = useRef(false);
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      textAreaRef.current.addEventListener('keydown', (event) => {
         if (event.key === 'Enter' && !event.shiftKey && valueHasChangedAfterSave.current) {
            event.preventDefault();
            setSaving(true);
            onChange(textAreaRef.current.value);
            valueHasChangedAfterSave.current = false;
         } else {
            valueHasChangedAfterSave.current = true;
         }
      });
   }, []);

   useEffect(() => {
      setSaving(false);
   }, [folderContext]);
   return (
      <div className={style.container}>
         <Textarea
            ref={textAreaRef}
            placeholder="Add a comment..."
            className={style.textarea}
            height={'5em'}
            width={'100%'}
            maxWidth={'100%'}
            resize={'none'}
         />
         <Button
            colorScheme="gray"
            variant="solid"
            onClick={() => {
               setSaving(true);
               onChange(textAreaRef.current.value);
               valueHasChangedAfterSave.current = false;
            }}>
            {saving ? (
               <Spinner></Spinner>
            ) : (
               <>
                  Save <img src={enterSvg} alt="enter svg" />
               </>
            )}
         </Button>
      </div>
   );
}

export default CommentInput;
