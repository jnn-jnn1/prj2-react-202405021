import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons/faUserPen";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/board/list?${searchParams}`)
      .then((res) => setBoardList(res.data));
  }, [searchParams]);

  console.log(searchParams.toString());

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
              <Tr
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => navigate(`/?page=${pageNumber}`)}
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
