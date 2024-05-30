import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete("/api/comment/remove", {
        data: { id: comment.id },
      })
      .then()
      .finally(() => setIsProcessing(false));
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
          <Button isLoading={isProcessing} onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
