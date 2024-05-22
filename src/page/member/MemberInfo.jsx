import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
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
          <Button bgColor={"blue"}>수정</Button>
          <Button bgColor={"red"}>삭제</Button>
        </Box>
      </Box>
    </Box>
  );
}
