import { useState, useEffect, Ref, RefObject } from "react";

interface IUseDragOptions {
  onPointerDown?: (e: MouseEvent) => void;
  onPointerUp?: (e: MouseEvent) => void;
  onPointerMove?: (e: MouseEvent) => void;
  onDrag?: (e: MouseEvent) => void;
}

const useDrag = (ref: RefObject<any>, deps: any[] = [], options: IUseDragOptions) => {
  const {
    onPointerDown = () => {},
    onPointerUp = () => {},
    onPointerMove = () => {},
    onDrag = () => {},
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: MouseEvent) => {
    setIsDragging(true);
    onPointerDown?.(e);

    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerUp = (e: MouseEvent) => {
    setIsDragging(false);
    onPointerUp?.(e);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: MouseEvent) => {
    onPointerMove(e);

    if (isDragging) {
      onDrag?.(e);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);

      return () => {
        element.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }

    return () => {};
  }, [...deps, isDragging]);

  return { isDragging };
};

export default useDrag;
