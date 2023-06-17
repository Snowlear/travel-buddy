import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.css";
import classnames from "classnames";
import Plus from "../../../assets/images/svgs/mini_plus.svg";
import Minus from "../../../assets/images/svgs/mini_minus.svg";
import X from "../../../assets/images/svgs/x.svg";
import MiniButton from "../MiniButton/MiniButton";
import Remove from "../../../assets/images/svgs/remove.svg";
import Bubble from "../Bubble/Bubble";

interface InputProps {
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  className?: string;
  bubbleContent?: React.ReactNode | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.FocusEventHandler<HTMLInputElement>;
  onClear?: () => void;
  onDestroy?: () => void;
  onNumberChange?: (input: number) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  error,
  className,
  bubbleContent,
  onFocus,
  onBlur,
  onChange,
  onNumberChange,
  onClear,
  onDestroy,
  type = "text",
}) => {
  
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const inputWrapper = useRef<HTMLDivElement>(null);
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (
      inputWrapper.current &&
      !inputWrapper.current.contains(e.relatedTarget as Node)
    ) {
      setIsPopOpen(false);
    }
    onBlur && onBlur(e);
  };

  return (
    <div
      onFocus={() => setIsPopOpen(true)}
      className={classnames(
        styles["input_" + type],
        styles.inputWrapper,
        className
      )}
    >
      <label className={styles.label}>{label}</label>
      <div className={styles.inputField}>
        <div
          className={styles.inputDialog}
          onBlur={handleOnBlur}
          ref={inputWrapper}
        >
          <input
            type={type}
            onFocus={onFocus}
            onChange={onChange}
            value={value}
            className={classnames(
              styles["inputTag_" + type],
              { [styles.invalidInput]: error },
              styles.inputTag
            )}
          />
          {type === "text" && value.length > 0 && (
            <img
              onClick={() => onClear && onClear()}
              className={styles.clearButton}
              alt="clearItem"
              src={X}
            ></img>
          )}
          {value.length > 0 &&
            bubbleContent &&
            isPopOpen &&
            type === "text" && <Bubble>{bubbleContent}</Bubble>}
        </div>
        {onDestroy && (
          <img
            onClick={() => onDestroy && onDestroy()}
            className={styles.removeButton}
            alt="Remove Button"
            src={Remove}
          />
        )}
      </div>
      {error && <label className={styles.errorLabel}>{error}</label>}
      {type === "number" && (
        <>
          <MiniButton
            onClick={() => onNumberChange && onNumberChange(Number(value) - 1)}
            className={styles.minusButton}
            disabled={Number(value) === 0}
          >
            <img alt="minus" src={Minus}></img>
          </MiniButton>
          <MiniButton
            onClick={() => onNumberChange && onNumberChange(Number(value) + 1)}
            className={styles.plusButton}
          >
            <img alt="plus" src={Plus}></img>
          </MiniButton>
        </>
      )}
    </div>
  );
};

export default Input;
