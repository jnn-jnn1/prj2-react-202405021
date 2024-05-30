import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CommentItem({ comment, isDeleting, setIsDeleting }) {
  function handleRemoveClick() {
    setIsDeleting(true);
    axios
      .delete("/api/comment/remove", {
        data: { id: comment.id },
      })
      .then();
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Box>
        <Box>{comment.nickName}</Box>
      </Box>
      <Spacer />
      <Box>
        <Box>{comment.inserted}</Box>
      </Box>
      <Flex>
        <Box>
          <Box>{comment.comment}</Box>
        </Box>
        <Box>
          <Button onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
