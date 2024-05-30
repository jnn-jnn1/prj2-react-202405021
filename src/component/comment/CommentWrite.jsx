import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

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
        isDisabled={!account.isLoggedIn()}
        placeholder={
          account.isLoggedIn()
            ? "댓글을 작성해 보세요"
            : "댓글을 작성하시려면 로그인하세요"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip
        label={"로그인 하세요"}
        isDisabled={account.isLoggedIn()}
        placement="top"
      >
        <Button
          isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
          isLoading={isSending}
          colorScheme={"blue"}
          onClick={handleCommentSubmitClick}
        >
          댓글입력
        </Button>
      </Tooltip>
    </Box>
  );
}
