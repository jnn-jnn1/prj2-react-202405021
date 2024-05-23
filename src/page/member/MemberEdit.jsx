import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
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

  function handleClick() {
    axios.post("/api/member/modify", member).then().catch();
  }

  if (member == null) {
    return <Spinner />;
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
          <Input />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>별명</FormLabel>
          <Input
            onChange={(e) => setMember({ ...member, nickName: e.target.value })}
            value={member.nickName}
          />
        </FormControl>
      </Box>
      <Box>
        <Button onClick={handleClick} colorScheme={"blue"}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
