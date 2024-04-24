// React
import { useState } from "react";

function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return { isOpen, toggle };
}

export default useToggle;
