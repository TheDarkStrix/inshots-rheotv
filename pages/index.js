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
    {
      color: "black",
      title: "Top 12 things to know before the market opens - Moneycontrol.com",
      author: "Staff Writer",
      url:
        "https://www.livemint.com/news/india/covid-vaccine-age-limit-eased-mha-issues-new-guidelines-amid-surge-in-cases-top-developments-11616547567569.html",
      content:
        "In a big boost to India's inoculation drive amid a surge in new Covid-19 cases, the Central Government has eased the age limit on vaccination, allowing all those above 45 years in age to get the dose… [+6806 chars]",
      urlToImage:
        "https://images.moneycontrol.com/static-mcnews/2020/01/BSE_Sensex_Stocks_market-770x433.png",
    },
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
