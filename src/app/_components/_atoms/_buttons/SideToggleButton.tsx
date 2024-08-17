import React from "react";
import styles from "./SideToggleButton.module.css"

interface SideToggleButtonProps {
    backgroundImage: string;
    onClick: () => void;
}

const SideToggleButton: React.FC<SideToggleButtonProps> = ({ backgroundImage, onClick }) => {
    return (
        <button
            className={styles.sideToggleButton}
            type="button"
            style={{backgroundImage: `url(${backgroundImage})`}}
            onClick={onClick}/>
    )
}

export default SideToggleButton;