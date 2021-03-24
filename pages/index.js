import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import Swipeable from "../components/swipeable/swipeable";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const [onDownSwipe, setOnDownSwipe] = useState(1);
  const [onUpSwipe, setOnUpSwipe] = useState(1);
  const [lastSwipedCard, setLastSwipedCard] = useState(-1);
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNewsPost = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=cdba3169c96b449f94dcde25a097fe44"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.articles);
        if (data.articles) {
          setArticles(data.articles);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getNewsPost();
  }, []);

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
      {!loading ? (
        <>
          {articles.reverse().map((data, i) => (
            <Swipeable
              data={data}
              key={i}
              i={i}
              lastSwiped={lastSwipedCard}
              onSwipe={onSwipe}
              onDownSwipe={onDownSwipe}
            />
          ))}
        </>
      ) : (
        "Loading, getting upto date news ....."
      )}
    </div>
  );
}
