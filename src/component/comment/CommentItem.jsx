import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../LoginProvider.jsx";
import { useContext } from "react";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete("/api/comment/remove", {
        data: { id: comment.id },
      })
      .then(() =>
        toast({
          status: "success",
          description: "댓글이 삭제되었습니다",
          position: "top",
        }),
      )
      .catch(() =>
        toast({
          status: "error",
          description: "권한이 없습니다",
          position: "top",
        }),
      )
      .finally(() => {
        setIsProcessing(false);
        onClose();
      });
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
        <Box>{comment.comment}</Box>
        <Spacer />
        {account.hasAccess(comment.memberId) && (
          <Box>
            <Button isLoading={isProcessing} onClick={onOpen}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Box>
        )}
      </Flex>
      {account.hasAccess(comment.memberId) && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>삭제 확인</ModalHeader>
            <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button
                colorSheme={"red"}
                isLoading={isProcessing}
                onClick={handleRemoveClick}
              >
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
