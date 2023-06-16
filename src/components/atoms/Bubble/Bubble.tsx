import React from "react";
import styles from "./Bubble.module.css";
import classnames from "classnames";

interface BubbleProps {
  children: React.ReactNode;
  disabled?: boolean;
  direction?: "up" | "right";
  isRelative?: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
  children,
  direction = "up",
  isRelative = false,
}) => {
  return (
    <div
      tabIndex={0}
      className={classnames(
        { [styles.relativeView]: isRelative },
        styles.bubble,
        styles[direction]
      )}
    >
      {children}
    </div>
  );
};

export default Bubble;
