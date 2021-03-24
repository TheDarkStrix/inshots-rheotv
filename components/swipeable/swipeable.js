import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Swipeable = (props) => {
  const [absY, setAbsY] = useState(0);
  const [isSwipped, setIsSwipped] = useState(false);
  //const scrollY = useMotionValue(0);
  //const scaleValue = useTransform(scrollY, [0, window.innerHeight], [0.8, 1]);
  const controller = useAnimation();

  const variant = {
    top: {
      y: "-100vh",
      transition: {
        ease: "linear",
        duration: 0.6,
      },
    },
    bottom: {
      y: "0",
      transition: {
        ease: "linear",
        duration: 0.6,
      },
    },
    behind: {
      scale: 0.8,
    },
  };

  const handlers = useSwipeable({
    onSwiping: (e) => {
      console.log("c", e.deltaY);
      if (e.deltaY < 0 && props.i != 0) setAbsY(e.deltaY);
    },
    onSwipedUp: (e) => {
      if (props.i != 0) {
        console.log("swipeUp", e);
        props.onSwipe(props.i);
        controller.start(variant.top);
      }
    },
    onSwipedDown: (e) => {
      console.log("swipeDown", e);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  useEffect(() => {
    console.log(props.onDownSwipe);
    if (props.lastSwiped === props.i) {
      console.log("useEffect abs");
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
