import React from "react";
import styles from "./ColorPalletButton.module.css"

interface ColorPalletButtonProps {
    key: number,
    colorCode: string | "none",
    onClick: () => void;
}

const ColorPalletButton: React.FC<ColorPalletButtonProps> = ({ colorCode, onClick, index }) => {
    return (
        <button
            className={`${colorCode === "none" ? styles.unsetColorButton : styles.colorButton}`}
            key={index}
            style={{backgroundColor: colorCode === "none" ? "#FFFFFF" : colorCode}}
            onClick={onClick}/>
    )
}

export default ColorPalletButton;