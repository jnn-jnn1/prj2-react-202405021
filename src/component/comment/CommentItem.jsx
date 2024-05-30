import { Box, Spacer } from "@chakra-ui/react";

export function CommentItem({ comment }) {
  return (
    <Box border={"1px solid black"} my={3}>
      <Box>
        <Box>{comment.nickName}</Box>
      </Box>
      <Spacer />
      <Box>
        <Box>{comment.inserted}</Box>
      </Box>
      <Box>
        <Box>{comment.comment}</Box>
      </Box>
    </Box>
  );
}
