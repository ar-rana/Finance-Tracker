import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import type { DraggablePopupProps } from "../../types/Component";

interface coords {
  x: number;
  y: number;
}

const DraggableModal: React.FC<DraggablePopupProps> = (props) => {
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<coords>({ x: 0, y: 0 });
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    },
    [isDragging]
  );

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  useEffect(() => {
    if (!props.isOpen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [props.isOpen]);

  if (!props.isOpen) return null;
  return (
    <div
      className="z-50 fixed left-1/2 right-1/2 h-[45%] w-[50%] transform -translate-x-1/2 translate-y-1/2 shadow-2xl bg-gray-800 rounded-2xl overflow-auto scrollbar-hide"
      onClick={(e) => e.stopPropagation()}
      ref={popupRef}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div
        className={`bg-gray-700 px-6 py-3 flex items-center justify-between ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={onMouseDown}
      >
        <h2 className="text-xl font-bold text-white">{props.heading}</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400 cursor-auto"
          onClick={() => dispatch(props.thunk())}
        />
      </div>
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default DraggableModal;
