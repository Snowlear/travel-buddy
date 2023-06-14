import React from "react";
import styles from "./Input.module.css";
import classnames from "classnames";
import Plus from "../../../assets/images/svgs/mini_plus.svg";
import Minus from "../../../assets/images/svgs/mini_minus.svg";
import MiniButton from "../MiniButton/MiniButton";

interface InputProps {
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  isValid?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.FocusEventHandler<HTMLInputElement>;
  onNumberChange?: (input: number) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  error,
  onFocus,
  onBlur,
  onChange,
  onNumberChange,
  type = "text",
}) => {
  return (
    <div className={classnames(styles["input_" + type], styles.inputWrapper)}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={classnames(
          styles["inputTag_" + type],
          { [styles.invalidInput]: error },
          styles.inputTag
        )}
      />
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
