import {
  Box,
  Button,
  Flex,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, setIsProcessing, isProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleCommentSubmitClick() {
    setIsProcessing(true);
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
      .finally(() => setIsProcessing(false));
  }

  return (
    <Flex gap={2}>
      <Box flex={1}>
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
      </Box>
      <Box>
        <Tooltip
          label={"로그인 하세요"}
          isDisabled={account.isLoggedIn()}
          placement="top"
        >
          <Button
            isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
            isLoading={isProcessing}
            colorScheme={"blue"}
            onClick={handleCommentSubmitClick}
          >
            댓글입력
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
}
