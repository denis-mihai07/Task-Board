import { useState } from "react";
import Header from "./Board-Components/Header/Header.jsx";
import Background from "./Board-Components/Background/Background.jsx";

const Board = () => {
  const [bgUrl, setBgUrl] = useState(null);

  return (
    <>
      <Header setBackground={setBgUrl} />
      <Background bgUrl={bgUrl} />
    </>
  );
};

export default Board;
