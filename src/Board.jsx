import { useState } from "react";
import Header from "./Board-Components/Header/Header.jsx";

const Board = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
    </>
  );
};

export default Board;
