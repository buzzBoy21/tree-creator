/* eslint-disable react/jsx-key */
// I disabled this rule because it's a false positive, it won't cause any issues

import { forwardRef, useEffect, useState } from 'react';
import { createResource } from '../../utils/createResource';
import { makeOutPut } from '../../utils/makeOutPut';
import PropTypes from 'prop-types';
import useTimeOut from '../../hook/useTimeOut';
const OutPutText = forwardRef(function OutPutText({ context, configurationContext }, ref) {
   const [result, setResult] = useState('');
   const [resource, setResource] = useState(null);
   const [timeOutMilliseconds] = useTimeOut(context.highestId);
   useEffect(() => {
      const textFolderStructure = createResource(
         new Promise((resolve, reject) => {
            setTimeout(() => {
               try {
                  const commentColor = configurationContext.colorComment.color.concat(
                     configurationContext.colorComment.alpha.length < 2
                        ? '0' + configurationContext.colorComment.alpha
                        : configurationContext.colorComment.alpha
                  );
                  const branchColor = configurationContext.colorBranch.color.concat(
                     configurationContext.colorBranch.alpha.length < 2
                        ? '0' + configurationContext.colorBranch.alpha
                        : configurationContext.colorBranch.alpha
                  );
                  const folderColor = configurationContext.folderColor.color.concat(
                     configurationContext.folderColor.alpha.length < 2
                        ? '0' + configurationContext.folderColor.alpha
                        : configurationContext.folderColor.alpha
                  );
                  const slashColor = configurationContext.slashColor.color.concat(
                     configurationContext.slashColor.alpha.length < 2
                        ? '0' + configurationContext.slashColor.alpha
                        : configurationContext.slashColor.alpha
                  );
                  const output = makeOutPut(
                     context.folders,
                     configurationContext.indentation,
                     configurationContext.tabulationPerFolder,
                     configurationContext.showFolderSlash,
                     configurationContext.showComment,
                     configurationContext.indicateCommentWith,
                     configurationContext.maxCommentWidth,
                     commentColor,
                     branchColor,
                     folderColor,
                     slashColor
                  );
                  resolve(output);
               } catch (error) {
                  reject(error);
               }
            }, timeOutMilliseconds);
         })
      );
      setResource(textFolderStructure);
   }, [context, configurationContext]);

   if (resource) {
      const outPut = resource.read();
      setResult(outPut);
      setResource(null);
   }

   return (
      <div style={{ display: 'block', padding: '1em', width: 'fit-content' }} ref={ref}>
         {result}
      </div>
   );
});
export default OutPutText;

const OutPutTextPropTypes = {
   context: PropTypes.shape({
      folders: PropTypes.arrayOf(PropTypes.object).isRequired,
      highestId: PropTypes.number.isRequired,
   }).isRequired,
   configurationContext: PropTypes.shape({
      colorComment: PropTypes.shape({
         color: PropTypes.string.isRequired,
         alpha: PropTypes.string.isRequired,
      }).isRequired,
      colorBranch: PropTypes.shape({
         color: PropTypes.string.isRequired,
         alpha: PropTypes.string.isRequired,
      }).isRequired,
      folderColor: PropTypes.shape({
         color: PropTypes.string.isRequired,
         alpha: PropTypes.string.isRequired,
      }).isRequired,
      slashColor: PropTypes.shape({
         color: PropTypes.string.isRequired,
         alpha: PropTypes.string.isRequired,
      }).isRequired,
      indentation: PropTypes.string.isRequired,
      tabulationPerFolder: PropTypes.object.isRequired,
      showFolderSlash: PropTypes.string.isRequired,
      showComment: PropTypes.bool.isRequired,
      indicateCommentWith: PropTypes.string.isRequired,
      maxCommentWidth: PropTypes.string.isRequired,
   }).isRequired,
};

OutPutText.propTypes = OutPutTextPropTypes;
