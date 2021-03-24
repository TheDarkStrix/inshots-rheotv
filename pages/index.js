import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import Swipeable from "../components/swipeable/swipeable";
import { useSwipeable } from "react-swipeable";

import { data } from "../pages/api/data";

export default function Home() {
  const [onDownSwipe, setOnDownSwipe] = useState(1);
  const [lastSwipedCard, setLastSwipedCard] = useState(-1);

  const onSwipe = (i) => {
    console.log("SWIPE FROM CHILD", i);
    setLastSwipedCard(i);
  };

  const handlers = useSwipeable({
    onSwipedDown: (e) => {
      console.log("parentswipeDown", e);
      setOnDownSwipe(onDownSwipe + 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height: "100vh",
      }}
      {...handlers}
    >
      {data.reverse().map((data, i) => (
        <Swipeable
          data={data}
          key={i}
          i={i}
          lastSwiped={lastSwipedCard}
          onSwipe={onSwipe}
          onDownSwipe={onDownSwipe}
        />
      ))}
    </div>
  );
}
