import { useEffect, useState } from "react";
import Header from "./Board-Components/Header/Header.jsx";
import Background from "./Board-Components/Background/Background.jsx";
import Content from "./Board-Components/Content/Content.jsx";

const Board = () => {
  const [bgUrl, setBgUrl] = useState(null);

  const [boardName, setBoardName] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/6963522bd0ea881f406396af",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$78y7ZQr33DNSO7Mycug1reYn4Utz7J2Fh4mCCQpGv2bF8w6acJ1G6",
            },
          }
        );
        const data = (await res.json()).record;

        setBgUrl(data.background_url);
        setBoardName(data.boardName);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBoard();
  }, []);

  useEffect(() => {
    // console.log(boardName);
    // POST la DB cu BoardName
    if (!boardName || !bgUrl) return;
    const saveBoard = async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/6963522bd0ea881f406396af",
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "anonymous",
              "Content-Type": "application/json",
              "X-Master-Key":
                "$2a$10$78y7ZQr33DNSO7Mycug1reYn4Utz7J2Fh4mCCQpGv2bF8w6acJ1G6",
            },
            body: JSON.stringify({
              boardName: boardName,
              background_url: bgUrl,
            }),
          }
        );
        if (res.ok) {
          console.log("/PUT BOARD: ", res.status);
        }
      } catch (err) {
        console.error("/PUT BOARD ERROR: ", err);
      }
    };

    saveBoard();
  }, [boardName, bgUrl]);

  return (
    <>
      <Header
        setBackground={setBgUrl}
        boardName={boardName}
        setBoardName={setBoardName}
        setBgUrl={setBgUrl}
      />
      <Background bgUrl={bgUrl} />
      <Content />
    </>
  );
};

export default Board;
