import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const account = useContext(LoginContext);
  const [files, setFiles] = useState([]);

  function handleSaveClick() {
    setLoading(true);
    axios
      .postForm("/api/board/add", { title, content, files })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
          position: "top",
        });
        navigate("/");
      })
      .catch((e) => {
        const code = e.response.status;
        if (code === 400) {
          toast({
            status: "error",
            description: "입력되지 않은 항목이 존재합니다",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li>{files[i].name}</li>);
  }

  return (
    <Box>
      <Box>글 작성 화면</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea onChange={(e) => setContent(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>파일 첨부</FormLabel>
            <Input
              type={"file"}
              accept={"image/*"}
              multiple
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <FormHelperText>
              총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <ul>{fileNameList}</ul>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input readOnly value={account.nickName} />
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={loading}
            isDisabled={disableSaveButton}
            colorScheme={"blue"}
            onClick={handleSaveClick}
          >
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
