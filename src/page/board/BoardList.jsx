import {
  Box,
  Button,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons/faUserPen";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]);

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
      <Center>
        <Flex>
          <Box>
            {pageInfo.prevPageNumber && (
              <Button onClick={() => navigate("/?page=1")}>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Button>
            )}
            {pageInfo.prevPageNumber && (
              <Button
                onClick={() => navigate(`/?page=${pageInfo.prevPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            )}
          </Box>
          <Box>
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => navigate(`/?page=${pageNumber}`)}
                colorScheme={
                  pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
                }
              >
                {pageNumber}
              </Button>
            ))}
          </Box>
          <Box>
            {pageInfo.nextPageNumber && (
              <Button
                onClick={() => navigate(`/?page=${pageInfo.nextPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            )}
            {pageInfo.nextPageNumber && (
              <Button
                onClick={() => navigate(`/?page=${pageInfo.lastPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            )}
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
