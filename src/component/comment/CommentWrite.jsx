import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", { comment, boardId })
      .then(() => {
        setComment("");
        toast({
          status: "success",
          description: "댓글 작성 완료",
          position: "top",
        });
      })
      .finally(() => setIsSending(false));
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성할 수 있습니다"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSending}
        colorScheme={"blue"}
        onClick={handleCommentSubmitClick}
      >
        댓글입력
      </Button>
    </Box>
  );
}
