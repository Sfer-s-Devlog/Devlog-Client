import styles from "./RecordSideBar.module.css"
import React from "react";

interface RecordSideBarProps {
    isOpen: boolean;
}

const RecordSideBar: React.FC<RecordSideBarProps> = () => {
    return (
        <div className={`${styles.entireWrapper}`}>

        </div>
    )
}

export default RecordSideBar;