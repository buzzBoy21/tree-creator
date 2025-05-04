import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   Button,
   ModalFooter,
   Tabs,
   TabList,
   Tab,
   TabPanels,
   TabPanel,
   Heading,
   Kbd,
} from '@chakra-ui/react';
import ComparativeTable from '../comparativeTable/ComparativeTable';
import cameraIcon from './../../assets/camera.svg';
import markDownIcon from './../../assets/markdown.svg';
import copyPlainTextIcon from './../../assets/copy-text.svg';
import bitBucketIcon from './../../assets/bitbucket.svg';
import gitHubIcon from './../../assets/github.svg';
import gitLabIcon from './../../assets/gitlab.svg';
import CodeExample from '../CodeExample/CodeExample';
import styles from './HelpModal.module.css';
import useWindowSize from '../../hook/useWindowSize';
const pictureHTML = `<picture>
   <!-- Image for dark mode -->
   <source srcset="./relativePath.png" media="(prefers-color-scheme: dark)">
   <!-- Image for light mode -->
   <source srcset="./relativePath.png" media="(prefers-color-scheme: light)">
   <!-- Default fallback image -->
   <img src="./relativePath.png" alt="Image description">
</picture>
`;
const changeSueToSize = `<picture>
  <!-- Big image for wide screens -->
  <source srcset="./wide-image.png" media="(min-width: 1024px)" />
  <!-- Medium image for tablets -->
  <source srcset="./medium-image.png" media="(min-width: 600px)" />
  <!-- Small image for phones -->
  <img src="./small-image.png" alt="Responsive image" />
</picture>
`;
const gitRepositories = `<picture>
  <!-- Big image for wide screens in dark mode -->
  <source srcset="./wide-image-dark.png" media="(min-width: 1024px) and (prefers-color-scheme: dark)" />
  
  <!-- Big image for wide screens in light mode -->
  <source srcset="./wide-image-light.png" media="(min-width: 1024px) and (prefers-color-scheme: light)" />
  
  <!-- Medium image for tablets in dark mode -->
  <source srcset="./medium-image-dark.png" media="(min-width: 600px) and (prefers-color-scheme: dark)" />
  
  <!-- Medium image for tablets in light mode -->
  <source srcset="./medium-image-light.png" media="(min-width: 600px) and (prefers-color-scheme: light)" />
  
  <!-- Small image for phones in dark mode -->
  <source srcset="./small-image-dark.png" media="(max-width: 599px) and (prefers-color-scheme: dark)" />
  
  <!-- Small image for phones in light mode -->
  <source srcset="./small-image-light.png" media="(max-width: 599px) and (prefers-color-scheme: light)" />
  
  <!-- Default fallback image (used if no other condition matches) -->
  <img src="./fallback-image.png" alt="Responsive image" />
</picture>`;
const templateTextMode = `<!-- 1º Option, It support the folder structure when shrunk, 
instead of this we recommend markdown mode -->
<pre style="width:100%, overflow:auto">
└──exampleFolder/
   ├──subfolder2/
   │  └──subforder4/
   └──subfolder1/
</pre>

<!-- 2º Option, It doesn't preserve the folder structure when shrunk -->
\`\`\`
└──exampleFolder/
   ├──subfolder2/
   │  └──subforder4/
   └──subfolder1/
\`\`\``;
function HelpModal({ isOpen, onClose }) {
   const [width, height] = useWindowSize();
   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size={'4xl'}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>📖Best Practices </ModalHeader>
               <ModalCloseButton />
               <ModalBody gap={2} display="flex" flexDirection="column">
                  <Tabs size="md" variant="enclosed">
                     <TabList>
                        <Tab>
                           <div
                              className={styles.repositoriesTab}
                              style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 flexWrap: 'wrap',
                                 gap: '0.2em',
                                 minWidth: '1em',
                              }}>
                              <img src={gitHubIcon} style={{ height: '1.2em' }} />
                              <img src={gitLabIcon} style={{ height: '1.2em' }} />
                              <img src={bitBucketIcon} style={{ height: '1.2em' }} />
                           </div>
                           {width > 370 && (
                              <span style={{ marginLeft: '1em' }}>
                                 Repositories {width > 500 && 'of Git'}{' '}
                              </span>
                           )}
                        </Tab>
                        <Tab>
                           <img src={cameraIcon} style={{ height: '1.2em', marginRight: '1em' }} />
                           <span>Photo mode</span>
                        </Tab>
                        <Tab>
                           <img
                              src={markDownIcon}
                              style={{ height: '1.2em', marginRight: '1em' }}
                           />
                           <span> {width < 500 ? '.md' : 'Markdown mode'}</span>
                        </Tab>
                        <Tab>
                           <img
                              src={copyPlainTextIcon}
                              style={{ height: '1.2em', marginRight: '1em' }}
                           />
                           <span>Plain Text mode</span>
                        </Tab>
                     </TabList>
                     <TabPanels>
                        <TabPanel>
                           <p>
                              Here you&#39;ll learn the best way to write your folder tree in your
                              Git repositories. To learn more about each option, please check the
                              <b> table below</b>.
                           </p>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              <img src={cameraIcon} style={{ height: '1em', display: 'inline' }} />{' '}
                              Photo mode (best option)
                           </Heading>
                           <p style={{ marginTop: '0.5em' }}>
                              Here’s a template you can use. We recommend using the color template
                              to speed up the configuration process.
                           </p>
                           <CodeExample size="s">{gitRepositories}</CodeExample>
                           <Heading
                              as="h2"
                              size="md"
                              margin={'1.2em 0 0 0'}
                              style={{ display: 'inline' }}>
                              <img
                                 src={markDownIcon}
                                 alt="markdown image"
                                 style={{
                                    height: '1em',
                                    display: 'inline-flex',
                                 }}
                              />{' '}
                              Use markdown mode
                           </Heading>
                           <p style={{ marginTop: '0.5em' }}>
                              We recommend changing the background color to <b>transparent</b> to
                              achieve better styling and integration.
                           </p>
                           <p style={{ marginTop: '0.5em' }}>
                              <b>Note:</b> Dark mode and light mode are not supported due to
                              limitations of Git platforms.
                           </p>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              <img
                                 src={copyPlainTextIcon}
                                 style={{ height: '1em', display: 'inline' }}
                              />{' '}
                              Use plain text mode
                           </Heading>

                           <p style={{ marginTop: '0.5em' }}>
                              We recommend using this only if you want to easily view the tree in
                              code mode. To understand the reason, please refer to the table below.
                              However, if you still want to use it, please use one of the templates
                              below.
                           </p>
                           <CodeExample>{templateTextMode}</CodeExample>
                           <Heading as="h2" size="md" margin={'1.2em 0 0.5em 0'}>
                              Comparative table
                           </Heading>
                           <ComparativeTable />
                        </TabPanel>
                        <TabPanel>
                           <p>
                              It is ready to work out of the box, but each photo you use must be in
                              your repository; otherwise, the URL will not load.
                           </p>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              Implementation for Git platforms.
                           </Heading>
                           <p style={{ marginTop: '0.5em' }}>
                              To learn more, please refer to the Git repositories section.
                           </p>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              Have dark mode and light mode
                           </Heading>
                           <p style={{ marginTop: '0.5em' }}>
                              With this piece of code, you can have a picture that changes depending
                              on the system's mode.
                           </p>
                           <CodeExample>{pictureHTML}</CodeExample>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              Change the image depending on the screen size
                           </Heading>
                           <p style={{ marginTop: '0.5em' }}>
                              You can use the <b>media</b> attribute to load images, even with{' '}
                              <i>dark and light modes</i>.
                           </p>
                           <CodeExample>{changeSueToSize}</CodeExample>
                           <p style={{ fontSize: '0.75em' }}>
                              📱 Mobile: 0–599px  |  📲 Phablet: 600–767px  |  💻 Tablet: 768–1023px
                               |  🖥️ Laptop/Desktop: 1024–1439px  |  🖥️🖥️ Large Desktop: 1440px+
                           </p>
                        </TabPanel>

                        <TabPanel>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              How to use
                           </Heading>
                           <p style={{ margin: '1em 0 1em 0' }}>
                              just{' '}
                              <span
                                 style={{
                                    display: 'inline-flex',
                                    gap: '0.35em',
                                    alignItems: 'center',
                                 }}>
                                 <b>click</b>
                                 <img
                                    src={markDownIcon}
                                    alt="markdown image"
                                    style={{ height: '1em', display: 'inline' }}
                                 />
                              </span>{' '}
                              & <b>COPY INTO REPO</b>
                           </p>
                           <hr style={{ marginBottom: '1em' }} />
                           <p>
                              It is ready to <b>work out of the box</b> and can be used directly on
                              any platform, IDE, or code editor that supports HTML (.md, GitHub,
                              GitLab, and so on).
                           </p>
                           <p> It uses "pre" tags and other elements to create the style.</p>
                        </TabPanel>
                        <TabPanel>
                           <Heading as="h2" size="md" margin={'1.2em 0 0 0'}>
                              How to use Plain Text mode
                           </Heading>
                           <p style={{ margin: '1em 0 1em 0' }}>
                              Plain Text mode is the simplest way to represent your folder
                              structure. It uses no styling or additional formatting.
                           </p>
                           <p>
                              To use this mode, simply copy the plain text output and paste it into
                              your desired platform or editor. This mode ensures maximum
                              compatibility across all tools.
                           </p>
                           <p style={{ marginTop: '0.5em' }}>
                              <b>Note:</b> Plain Text mode does not support color coding.
                           </p>
                        </TabPanel>
                     </TabPanels>
                  </Tabs>
               </ModalBody>

               <ModalFooter mt={10}></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default HelpModal;
