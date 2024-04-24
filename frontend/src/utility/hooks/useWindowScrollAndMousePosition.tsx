import { useEffect, useState } from "react";
import { GeneralObject } from "../types/utilityType";

function useWindowScrollAndMousePosition() {
  const [windowSize, setWindowSize] = useState<GeneralObject<number>>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [scrollPosition, setScrollPosition] = useState<GeneralObject<number>>({
    x: window.scrollX,
    y: window.scrollY,
  });

  const [mousePosition, setMousePosition] = useState<
    GeneralObject<number | null>
  >({
    x: null,
    y: null,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleScrollPosition = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScrollPosition);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleScrollPosition);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { windowSize, scrollPosition, mousePosition };
}

export default useWindowScrollAndMousePosition;
