import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import { motion, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Swipeable = (props) => {
  // captured the Y scroll distance
  const [absY, setAbsY] = useState(0);
  // Framer motion animation controller
  const controller = useAnimation();

  // animation settings / animation variants
  const variant = {
    top: {
      y: "-100vh",
      transition: {
        ease: "linear",
        duration: 0.4,
      },
    },
    bottom: {
      y: "0",
      transition: {
        ease: "linear",
        duration: 0.4,
      },
    },
  };

  const handlers = useSwipeable({
    //  listen for events , on per CARD level.
    onSwiping: (e) => {
      // listen for drag / continous swipe
      if (e.deltaY < 0 && props.i != 0) setAbsY(e.deltaY);
    },
    onSwipedUp: (e) => {
      if (props.i != 0) {
        // listen for swipe up
        props.onSwipe(props.i);
        controller.start(variant.top);
      }
    },
  });
  useEffect(() => {
    // swipe down only if there are swiped up cards
    if (props.lastSwiped === props.i) {
      controller.start(variant.bottom);
      props.onSwipe(props.i + 1);
    }
  }, [props.onDownSwipe]);

  return (
    <>
      <motion.div
        {...handlers}
        animate={controller}
        style={{
          y: absY || 0,
          height: "100vh",
          background: "white",
          position: "absolute",
          width: "100%",
          left: 0,
          top: 0,
        }}
      >
        <div className={style.newsWrapper}>
          <div className={style.image}>
            <img src={props.data.image} />
          </div>
          <div className={style.contentWrapper}>
            <div className={style.fixedContent}>
              <div className={style.title}>{props.data.title}</div>
              <div className={style.content}>{props.data.description}</div>
              <div className={style.author}>{props.data.source.name}</div>
            </div>
            <div className={style.footer}>
              <div className={style.blured}>
                <img src={props.data.image} />
              </div>
              <div className={style.semiTitle}>
                <a target="_blank" href={props.data.url}>
                  {props.data.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Swipeable;
