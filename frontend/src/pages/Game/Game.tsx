// Third party
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Custom hooks
// Components
import Image from "../../components/Image/Image";
// Types
import { Position } from "../../utility/types/utilityType";

function Game() {
  const [clickPosition, setClickPosition] = useState<Position>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state } = useLocation();

  useEffect(() => {
    const handleResize: () => void = () => {
      if (!isOpen) {
        setIsOpen(false);
        console.log("Resize");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    setIsOpen(true);
    setClickPosition({
      x: event.clientX,
      y: event.clientY,
    });
    // console.log({
    //   screenX: event.screenX,
    //   screenY: event.screenY,
    //   pageX: event.pageX,
    //   pageY: event.pageY,
    //   scrollX: window.scrollX,
    //   scrollY: window.scrollY,
    //   clientX: event.clientX,
    //   clientY: event.clientY,
    //   offsetX: event.nativeEvent.offsetX,
    //   offsetY: event.nativeEvent.offsetY,
    // });
  };

  return (
    <>
      <section onClick={handleClick}>
        <Image className="image" src={state.src}></Image>
      </section>
      {isOpen && (
        <>
          <div
            style={{
              position: "fixed",
              left: clickPosition?.x,
              top: clickPosition?.y,
              color: "yellow",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            doloremque?
          </div>
        </>
      )}
      <Link to="/">Back to home</Link>
    </>
  );
}

export default Game;
