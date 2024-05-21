import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons/faUserPen";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);

  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr key={board.id}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
