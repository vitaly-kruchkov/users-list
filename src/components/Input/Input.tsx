import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

const Input = ({ showClear, onClear, ...rest }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search users..."
        aria-label="Search users"
        {...rest}
      />
      {showClear && onClear && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear input"
          onClick={onClear}>
          ×
        </button>
      )}
    </div>
  );
};

export default Input;
