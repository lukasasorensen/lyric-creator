import { useState, useEffect, Ref, RefObject } from "react";

interface IUseDragOptions {
  onPointerDown: (e: MouseEvent) => void;
  onPointerUp: (e: MouseEvent) => void;
  onPointerMove: (e: MouseEvent) => void;
  onDrag: (e: MouseEvent) => void;
}

const useDrag = (ref: RefObject<any>, deps = [], options: IUseDragOptions) => {
  const {
    onPointerDown = () => {},
    onPointerUp = () => {},
    onPointerMove = () => {},
    onDrag = () => {},
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: MouseEvent) => {
    setIsDragging(true);

    onPointerDown(e);
  };

  const handlePointerUp = (e: MouseEvent) => {
    setIsDragging(false);

    onPointerUp(e);
  };

  const handlePointerMove = (e: MouseEvent) => {
    onPointerMove(e);

    if (isDragging) {
      onDrag(e);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("pointerdown", handlePointerDown);
      element.addEventListener("pointerup", handlePointerUp);
      element.addEventListener("pointermove", handlePointerMove);

      return () => {
        element.removeEventListener("mousedown", handlePointerDown);
        element.removeEventListener("mouseup", handlePointerUp);
        element.removeEventListener("mousemove", handlePointerMove);
      };
    }

    return () => {};
  }, [...deps, isDragging]);

  return { isDragging };
};

export default useDrag;
