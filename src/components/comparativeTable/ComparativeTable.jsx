import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import styles from './ComparativeTable.module.css';
function ComparativeTable() {
   return (
      <TableContainer>
         <Table variant="simple" size={'sm'} maxWidth={'100%'} className={styles.table}>
            <Thead>
               <Tr>
                  <Th>Features</Th>
                  <Th>Photo mode</Th>
                  <Th>Markdown mode</Th>
                  <Th>Plain text mode</Th>
               </Tr>
            </Thead>
            <Tbody>
               <Tr>
                  <Td width={'15em'} style={{ textWrap: 'wrap' }}>
                     Adapted to use directly in Git platforms
                  </Td>
                  <Td style={{ textAlign: 'center' }}>
                     ⚠️ <p>Use the above template</p>
                  </Td>
                  <Td>✅</Td>
                  <Td>❌</Td>
               </Tr>
               <Tr>
                  <Td>Maintain tree shape</Td>
                  <Td>✅</Td>
                  <Td>
                     ⚠️
                     <p>Has overflow with hidden style, to keep shape</p>
                  </Td>
                  <Td>❌</Td>
               </Tr>

               <Tr>
                  <Td>Maintain colors</Td>
                  <Td>✅</Td>
                  <Td>
                     ⚠️
                     <p>Visible only in IDEs, code editor and Markdown viewers</p>
                  </Td>
                  <Td>❌</Td>
               </Tr>
               <Tr>
                  <Td>Dark and light modes</Td>
                  <Td>✅</Td>
                  <Td>❌</Td>
                  <Td>❌</Td>
               </Tr>
               <Tr>
                  <Td>Low time implementation</Td>
                  <Td>
                     ⚠️
                     <p>Go below for an easier implementation</p>
                  </Td>
                  <Td>✅</Td>
                  <Td>
                     ⚠️ <p>Add "pre" tag or ```` to keep the shape</p>
                  </Td>
               </Tr>
               <Tr>
                  <Td>Keep branches gapless</Td>
                  <Td>✅</Td>
                  <Td>
                     ⚠️
                     <p>Visible only in IDEs, code editor and Markdown viewers</p>
                  </Td>
                  <Td>❌</Td>
               </Tr>
               <Tr>
                  <Td>Select Text</Td>
                  <Td>❌</Td>
                  <Td>✅</Td>
                  <Td>
                     ⚠️
                     <p>Less convenient than Markdown without template</p>
                  </Td>
               </Tr>
               <Tr>
                  <Td>Folder tree easily visible in code</Td>
                  <Td>❌</Td>
                  <Td>❌</Td>
                  <Td>
                     ✅<p>But with less features</p>
                  </Td>
               </Tr>
            </Tbody>
         </Table>
      </TableContainer>
   );
}

export default ComparativeTable;
