import { useState } from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import Swipeable from "../components/swipeable/swipeable";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const [onDownSwipe, setOnDownSwipe] = useState(1);
  const [onUpSwipe, setOnUpSwipe] = useState(1);
  const [lastSwipedCard, setLastSwipedCard] = useState(-1);

  let array = [
    { color: "red", title: "title 1" },
    { color: "blue", title: "title 2" },
    { color: "black", title: "title 3" },
    { color: "purple", title: "title 4" },
  ];

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
      {array.reverse().map((data, i) => (
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
