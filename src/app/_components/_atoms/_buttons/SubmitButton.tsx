import React from "react";
import styles from "./SubmitButton.module.css"

interface SubmitButtonProps {
    backgroundImage: string;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ backgroundImage, onClick }) => {
    return (
        <button
            className={styles.submitButton}
            type="submit"
            style={{backgroundImage: `url(${backgroundImage})`}}
            onClick={onClick} />
    )
}

export default SubmitButton;