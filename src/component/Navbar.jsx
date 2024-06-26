import { useNavigate } from "react-router-dom";
import { Center, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      gap={3}
      height={20}
      bgColor={"gray.100"}
      px={{
        lg: 100,
        base: 0,
      }}
    >
      <Center
        p={8}
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
        fontSize={24}
        fontWeight={600}
      >
        HOME_CHANGE
      </Center>
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          글쓰기
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUser} />
          {account.nickName}
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          회원목록
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          회원가입
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          로그인
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          로그아웃
        </Center>
      )}
    </Flex>
  );
}
