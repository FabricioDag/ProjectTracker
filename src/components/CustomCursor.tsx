import { useEffect, useState } from "react";
import styled from "styled-components";

import cursorImg from "../assets/cursor.png";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return <CursorWrapper style={{ left: position.x, top: position.y }} />;
};

const CursorWrapper = styled.div`
  position: fixed;
  outline:2px solid blue;
  width: 32px;
  height: 32px;
  background-color:red;
  background-image: url(${cursorImg});
  background-size: contain;
  background-repeat:no-repeat;
  pointer-events: none; /* Evita interferência com elementos clicáveis */
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

export  {CustomCursor};
