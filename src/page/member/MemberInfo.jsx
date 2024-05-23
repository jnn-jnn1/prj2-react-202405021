import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    setIsLoading(true);
    axios
      .delete(`/api/member/${id}`, { data: { id, password } })
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴 되었습니다",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose();
      });
  }

  return (
    <Box>
      <Box>회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} isReadOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} isReadOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일시</FormLabel>
            <Input value={member.signupDateAndTime} isReadOnly />
          </FormControl>
        </Box>
        <Box>
          <Button
            bgColor={"blue"}
            onClick={() => navigate(`/member/edit/${member.id}`)}
          >
            수정
          </Button>
          <Button bgColor={"red"} onClick={onOpen} isLoading={isLoading}>
            탈퇴
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              onClick={handleClickRemove}
              isLoading={isLoading}
              colorScheme={"red"}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
