import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberEdit() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const [oldNickName, setOldNickName] = useState("");

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
        setOldNickName(member1.nickName);
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 정보 조회 중 문제가 발생하였습니다.",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  function handleClickSave() {
    axios
      .put("/api/member/modify", { ...member, oldPassword })
      .then(() => {
        toast({
          status: "success",
          description: "회원 정보가 수정되었습니다",
          position: "top",
        });
        navigate(`/member/${id}`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원 정보가 수정되지 않았습니다",
          position: "top",
        });
      })
      .finally(() => {
        onClose();
        setOldPassword("");
      });
  }

  if (member == null) {
    return <Spinner />;
  }

  let isDisableSaveButton = false;

  if (member.nickName.trim().length == 0) {
    isDisableSaveButton = true;
  }

  if (member.password != passwordCheck) {
    isDisableSaveButton = true;
  }

  let isDisableNickNameCheckButton = false;

  if (member.nickName === oldNickName) {
    isDisableSaveButton = true;
  }

  if (member.nickName.length === 0) {
    isDisableSaveButton = true;
  }

  if (!isCheckedNickName) {
    isDisableSaveButton = true;
  }

  if (isCheckedNickName) {
    isDisableNickNameCheckButton = true;
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${member.nickName}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용할 수 없는 별명입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 별명입니다",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      });
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input readOnly value={member.email} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>암호</FormLabel>
          <Input
            onChange={(e) => setMember({ ...member, password: e.target.value })}
            placeholder={"암호를 변경하려면 입력하세요"}
          />
          <FormHelperText>
            입력하지 않으면 기존 암호를 변경하지 않습니다.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>암호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {member.password === passwordCheck || (
            <FormHelperText>암호가 일치하지 않습니다</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>별명</FormLabel>
          <InputGroup>
            <Input
              onChange={(e) => {
                const newNickName = e.target.value.trim();
                setMember({ ...member, nickName: newNickName });
                setIsCheckedNickName(newNickName === oldNickName);
              }}
              value={member.nickName}
            />
            <InputRightElement w={"75px"} mr={1}>
              <Button
                isDisabled={isDisableNickNameCheckButton}
                size={"sm"}
                onClick={handleCheckNickName}
              >
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Box>
        <Button
          onClick={onOpen}
          colorScheme={"blue"}
          isDisabled={isDisableSaveButton}
        >
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기존 암호 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>기존 암호</FormLabel>
              <Input onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClose={onClose}>취소</Button>
            <Button colorScheme={"blue"} onClick={handleClickSave}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
