"use client"

import React, {useState} from "react";
import styles from "./layout.module.css"
import RecordSideBar from "@/app/_components/_templates/_navigations/RecordSideBar";
import SideToggleButton from "@/app/_components/_atoms/_buttons/SideToggleButton";

export default function RecordLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [isOpen, setIsOpen] = useState(true);

    const onClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`${styles.sideBarWrapper} ${isOpen? '' : styles.closed}`}>
                <RecordSideBar isOpen={isOpen}/>
                <SideToggleButton
                    backgroundImage="/assets/icons/right.svg"
                    onClick={onClick}
                />
            </div>
            {children}
        </>
    )
}