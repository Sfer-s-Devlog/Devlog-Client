import React from "react";
import styles from "./TextButton.module.css"

interface TextButtonProps {
    type: "button" | "submit" | undefined;
    children: string;
    fontColor?: string;
    backgroundColor?: string;
    onClick: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ type, children, fontColor, backgroundColor, onClick }) => {
    return (
        <button
            className={styles.textButton}
            type={type}
            style={{color: fontColor, backgroundColor: backgroundColor}}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default TextButton;