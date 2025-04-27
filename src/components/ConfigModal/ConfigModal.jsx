import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   Button,
   ModalFooter,
   FormControl,
   FormLabel,
   Switch,
   NumberInputStepper,
   NumberIncrementStepper,
   NumberDecrementStepper,
   NumberInputField,
   NumberInput,
   Input,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import { defaultConfiguration } from '../../assets/constants';
import ColorPicker from './../colorPicker/ColorPicker';
import PaletteColors from './../paletteColors/PaletteColors';
function generateSpaces(count) {
   return ' '.repeat(count);
}
function generateSpacesWithLine(count) {
   return '│' + ' '.repeat(count - 1);
}
function ConfigModal({ isOpen }) {
   const [getConfiguration, setConfiguration] = useContext(ConfigurationContext);

   const [showFolderSlash, setShowFolderSlash] = useState(getConfiguration.showFolderSlash === '/');
   const [showCommentSwitch, setShowCommentSwitch] = useState(getConfiguration.showComment);
   const [heightBetweenLines, setHeightBetweenLines] = useState(
      getConfiguration.heightBetweenLines
   );
   const [maxCommentWidth, setMaxCommentWidth] = useState(getConfiguration.maxCommentWidth);
   const [indentation, setIndentation] = useState(getConfiguration.indentation.length);
   const [tabulationPerFolder, setTabulationPerFolder] = useState(
      getConfiguration.tabulationPerFolder.withOutLine.length
   );
   const [indicateCommentWith, setIndicateCommentWith] = useState(
      getConfiguration.indicateCommentWith
   );

   const [folderColor, setFolderColor] = useState(getConfiguration.folderColor);
   const [backgroundColor, setBackgroundColor] = useState(getConfiguration.colorBackground);
   const [commentColor, setCommentColor] = useState(getConfiguration.colorComment);
   const [branchColor, setBranchColor] = useState(getConfiguration.colorBranch);
   const [slashColor, setSlashColor] = useState(getConfiguration.slashColor);
   const [paletteChosen, setPaletteChosen] = useState(getConfiguration.paletteChosen);

   const onClose = () => {
      const tabulationPerFolderToStore = {
         withOutLine: generateSpaces(tabulationPerFolder),
         withLine: generateSpacesWithLine(tabulationPerFolder),
      };
      const identationToStore = generateSpaces(indentation);
      setConfiguration({
         colorBackground: backgroundColor,
         colorComment: commentColor,
         colorBranch: branchColor,
         slashColor: slashColor,
         folderColor: folderColor,
         showFolderSlash: showFolderSlash ? '/' : '',
         showComment: showCommentSwitch,
         indentation: identationToStore,
         tabulationPerFolder: tabulationPerFolderToStore,
         heightBetweenLines: heightBetweenLines,
         maxCommentWidth: maxCommentWidth,
         indicateCommentWith: indicateCommentWith,
         paletteChosen: paletteChosen,
      });
      console.log('showFolderSlash', tabulationPerFolderToStore);
      isOpen.setOpenConfigModal(false);
   };

   const handleResetConfiguration = () => {
      setShowFolderSlash(defaultConfiguration.showFolderSlash === '/');
      setShowCommentSwitch(defaultConfiguration.showComment);
      setHeightBetweenLines(defaultConfiguration.heightBetweenLines);
      setMaxCommentWidth(defaultConfiguration.maxCommentWidth);
      setIndentation(defaultConfiguration.indentation.length);
      setTabulationPerFolder(defaultConfiguration.tabulationPerFolder.withOutLine.length);
      setIndicateCommentWith(defaultConfiguration.indicateCommentWith);
      setBackgroundColor(defaultConfiguration.colorBackground);
      setCommentColor(defaultConfiguration.colorComment);
      setBranchColor(defaultConfiguration.colorBranch);
      setFolderColor(defaultConfiguration.folderColor);
      setSlashColor(defaultConfiguration.slashColor);
      setPaletteChosen(defaultConfiguration.paletteChosen);
   };

   const changeColorsByPalettes = (colors, title) => {
      setPaletteChosen(title);
      setBackgroundColor(colors.colorBackground);
      setCommentColor(colors.colorComment);
      setBranchColor(colors.colorBranch);
      setFolderColor(colors.folderColor);
      setSlashColor(colors.slashColor);
   };
   return (
      <Modal isOpen={isOpen.openConfigModal} scrollBehavior="inside">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>⚙️Config </ModalHeader>
            <ModalCloseButton
               onClick={() => {
                  onClose();
               }}
            />
            <ModalBody gap={2} display="flex" flexDirection="column">
               <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="showFolderSlash" mb="0">
                     Show folder slash
                  </FormLabel>
                  <Switch
                     id="showFolderSlash"
                     onChange={(e) => setShowFolderSlash(e.target.checked)}
                     isChecked={showFolderSlash}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel htmlFor="showComment" mb="0">
                     Show comments
                  </FormLabel>
                  <Switch
                     id="showComment"
                     onChange={(e) => setShowCommentSwitch(e.target.checked)}
                     isChecked={showCommentSwitch}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Height between lines</FormLabel>
                  <NumberInput
                     min={1}
                     max={5}
                     onChange={(value) => setHeightBetweenLines(value)}
                     value={heightBetweenLines}>
                     <NumberInputField />
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </NumberInput>
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Max comment width</FormLabel>
                  <NumberInput
                     min={10}
                     max={200}
                     onChange={(value) => setMaxCommentWidth(value)}
                     value={maxCommentWidth}>
                     <NumberInputField />
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </NumberInput>
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Indentation</FormLabel>
                  <NumberInput
                     min={0}
                     max={50}
                     onChange={(value) => setIndentation(value)}
                     value={indentation}>
                     <NumberInputField />
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </NumberInput>
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Tabulation per folder</FormLabel>
                  <NumberInput
                     min={1}
                     max={7}
                     value={tabulationPerFolder}
                     onChange={(value) => setTabulationPerFolder(value)}>
                     <NumberInputField />
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </NumberInput>
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Indicate comment with</FormLabel>

                  <Input
                     value={indicateCommentWith}
                     onChange={(value) => {
                        setIndicateCommentWith(value.target.value);
                     }}
                  />
               </FormControl>
               <FormControl>
                  <FormLabel mb="0">Colors palettes</FormLabel>
                  {/* <PaletteColors onChange={changeColorsByPalettes} value={paletteChosen} /> */}
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Folder color</FormLabel>
                  <ColorPicker
                     onChange={(value) => {
                        setFolderColor(value);
                        setPaletteChosen('');
                     }}
                     value={folderColor}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Comment color</FormLabel>

                  <ColorPicker
                     onChange={(value) => {
                        setCommentColor(value);
                        setPaletteChosen('');
                     }}
                     value={commentColor}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Background color</FormLabel>

                  <ColorPicker
                     onChange={(value) => {
                        setBackgroundColor(value);
                        setPaletteChosen('');
                     }}
                     value={backgroundColor}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Branch color</FormLabel>

                  <ColorPicker
                     onChange={(value) => {
                        setBranchColor(value);
                        setPaletteChosen('');
                     }}
                     value={branchColor}
                  />
               </FormControl>
               <FormControl display="flex" alignItems="center" mt={4}>
                  <FormLabel mb="0">Slash color</FormLabel>

                  <ColorPicker
                     onChange={(value) => {
                        setSlashColor(value);
                        setPaletteChosen('');
                     }}
                     value={slashColor}
                  />
               </FormControl>
            </ModalBody>

            <ModalFooter mt={10}>
               <Button variant="ghost" onClick={handleResetConfiguration}>
                  Reset configuration
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

export default ConfigModal;
