import { useEffect, useState } from "react";
import Header from "./Board-Components/Header/Header.jsx";
import Background from "./Board-Components/Background/Background.jsx";
import Content from "./Board-Components/Content/Content.jsx";

const Board = () => {
  const [bgUrl, setBgUrl] = useState(
    "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTM1NTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njc5Mjg2OTh8&ixlib=rb-4.1.0&q=85"
  );

  const [boardName, setBoardName] = useState("Denis's Board");

  useEffect(() => {
    // console.log(boardName);
    // POST la DB cu BoardName
  }, [boardName]);

  return (
    <>
      <Header
        setBackground={setBgUrl}
        boardName={boardName}
        setBoardName={setBoardName}
      />
      <Background bgUrl={bgUrl} />
      <Content />
    </>
  );
};

export default Board;
