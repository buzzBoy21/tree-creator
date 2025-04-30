import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PhraseWithDots({ children }) {
   const [word, setWord] = useState(children);
   useEffect(() => {
      setTimeout(() => {
         const hasDots = word.match(/\./g); //number of dots or null
         const dotsQuantity = hasDots ? hasDots.length : 0;

         const newWord = dotsQuantity < 3 ? children + '.'.repeat(dotsQuantity + 1) : children;
         setWord(newWord);
      }, 500);
   }, [word]);

   return <div>{word}</div>;
}

PhraseWithDots.propTypes = {
   children: PropTypes.string.isRequired,
};

export default PhraseWithDots;
