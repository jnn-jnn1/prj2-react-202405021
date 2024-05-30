import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .finally();
    }
  }, [isProcessing]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      ))}
    </Box>
  );
}
