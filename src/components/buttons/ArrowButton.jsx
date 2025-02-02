import emotionStyled from '@emotion/styled';
import ArrowUp from '../../assets/arrow-up.svg';
export default function ArrowButton({
   right = false,
   left = false,
   down = false,
   borderRadius = '100%',
   onClick,
}) {
   const Button = emotionStyled.button(() => ({
      backgroundColor: 'none',
      display: 'block',
      width: 'fit-content',
      borderRadius: borderRadius,
      transform: right
         ? 'rotateZ(90deg)'
         : left
           ? 'rotateZ(-90deg)'
           : down
             ? 'rotateZ(180deg)'
             : '',
      ':hover': {
         backgroundColor: 'var(--gray-200)',
      },
   }));

   return (
      <Button onClick={onClick}>
         <img src={ArrowUp} alt="" style={{ height: '1.5em', width: 'auto' }} />
      </Button>
   );
}
