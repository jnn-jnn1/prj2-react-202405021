import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    axios.post("/api/comment/add", { comment, boardId });
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성할 수 있습니다"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button colorScheme={"blue"} onClick={handleCommentSubmitClick}>
        댓글입력
      </Button>
    </Box>
  );
}
