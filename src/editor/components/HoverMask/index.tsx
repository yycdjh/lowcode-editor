import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface HoverMaskProps {
  containerClassName: string;
  componentId: number;
}

function HoverMask({ containerClassName, componentId }: HoverMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    setPosition({
      left: left - containerLeft + container.scrollLeft,
      top: top - containerTop + container.scrollTop,
      width,
      height,
    });
  }

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "wrapper";

    const container = document.querySelector(`.${containerClassName}`);
    container!.appendChild(el);

    return el;
  }, []);

  return createPortal(
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        border: "1px solid red",
        pointerEvents: "none",
        zIndex: 12,
        borderRadius: 4,
        boxSizing: "border-box",
      }}
    ></div>,
    el
  );
}

export default HoverMask;
