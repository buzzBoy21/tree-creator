import { Textarea } from '@chakra-ui/react';
import style from './style.module.css';
import { useState } from 'react';
function CommentInput({ onChange = () => {}, max }) {
   const [value, setValue] = useState(undefined);
   return (
      <div className="comment-input">
         <Textarea
            placeholder="Add a comment..."
            onChange={(event) => {
               setValue(event.target.value);
               onChange(event.target.value);
            }}
            className={style.textarea}
            height={'5em'}
            width={'100%'}
            maxWidth={'100%'}
            resize={'none'}
         />
      </div>
   );
}

export default CommentInput;
