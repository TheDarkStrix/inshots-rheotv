import { useState } from "react";
import Swipeable from "../components/swipeable/swipeable";
import { useSwipeable } from "react-swipeable";

//import static json data
import { data } from "../pages/api/data";

export default function Home() {
  // save states on down swipe
  const [onDownSwipe, setOnDownSwipe] = useState(1);
  // save the previous card[index] swiped off the screen
  const [lastSwipedCard, setLastSwipedCard] = useState(-1);

  const onSwipe = (i) => {
    //set the index of the last card swiped
    setLastSwipedCard(i);
  };

  // swipe detection handlers
  const handlers = useSwipeable({
    onSwipedDown: (e) => {
      // listen for swipe down and register it
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
