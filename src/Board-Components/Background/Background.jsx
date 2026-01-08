import "./Background.css";

import DefaultBackground from "../Header/default_picture.jpg";

import { useEffect, useRef, useState } from "react";

const Background = ({ bgUrl }) => {
  let backgroundStyle;
  if (bgUrl && bgUrl.includes("https")) {
    backgroundStyle = `url(${bgUrl})`;
  } else backgroundStyle = `linear-gradient(${bgUrl})`;

  return (
    <>
      {bgUrl && (
        <div
          className="board-bg"
          style={{
            backgroundImage: backgroundStyle,
          }}
        ></div>
      )}

      {!bgUrl && (
        <div className="default-pic">
          <img src={DefaultBackground} />
        </div>
      )}
    </>
  );
};

export default Background;
