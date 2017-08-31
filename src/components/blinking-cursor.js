import React from "react";
import styles from "../css/blinking-cursor.scss";

export default function BlinkingCursor({ isTyping }) {
  const classes = `${styles.cursor} ${isTyping ? "" : styles.blinking}`;
  return <span className={classes} />;
}
