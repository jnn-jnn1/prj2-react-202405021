import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  function handleClick() {
    setIsLoading(true);
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then(() => {
        toast({
          status: "success",
          description: "회원가입이 완료되었습니다.",
          position: "top",
        });
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해 주세요",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "회원 가입 중 문제가 발생하였습니다",
            position: "top",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다",
            position: "top",
          });
        }
        setIsCheckedEmail(true);
      })
      .finally();
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다",
            position: "top",
          });
        }
        setIsCheckedNickName(true);
      })
      .finally();
  }

  const isCheckedPassword = password === passwordCheck;

  let isDisabled = false;
  if (!isCheckedPassword) {
    isDisabled = true;
  }
  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }
  if (!isCheckedNickName) {
    isDisabled = true;
  }
  if (!isCheckedNickName) {
    isDisabled = true;
  }

  if (!isValidEmail) {
    isDisabled = true;
  }

  return (
    <Center>
      <Box w={400}>
        <Box mb={10}>
          <Heading>회원가입</Heading>
        </Box>
        <Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <InputGroup>
                <Input
                  type={"email"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsCheckedEmail(false);
                    setIsValidEmail(!e.target.validity.typeMismatch);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    isDisabled={!isValidEmail || email.trim().length === 0}
                    size={"sm"}
                    onClick={handleCheckEmail}
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isCheckedEmail || (
                <FormHelperText>이메일 중복확인을 해주세요</FormHelperText>
              )}
              {isValidEmail || (
                <FormHelperText>
                  올바른 이메일 형식으로 작성해 주세요.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>암호확인</FormLabel>
              <Input onChange={(e) => setPasswordCheck(e.target.value)} />
              {isCheckedPassword || (
                <FormHelperText>암호가 일치하지 않습니다</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>별명</FormLabel>
              <InputGroup>
                <Input
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value.trim());
                    setIsCheckedNickName(false);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    size={"sm"}
                    onClick={handleCheckNickName}
                    isDisabled={email.trim().length === 0}
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isCheckedNickName || (
                <FormHelperText>별명 중복확인을 해주세요</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={7}>
            <Button
              isLoading={isLoading}
              colorScheme={"blue"}
              onClick={handleClick}
              isDisabled={isDisabled}
            >
              가입
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
