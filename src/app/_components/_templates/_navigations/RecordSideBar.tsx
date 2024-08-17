"use client"

import styles from "./RecordSideBar.module.css"
import React from "react";
import ProfileImage from "@/app/_components/_molecules/ProfileImage";
import BasicHr from "@/app/_components/_atoms/_hr/BasicHr";
import SimpleTextSearch from "@/app/_components/_organisms/SimpleTextSearch";

interface RecordSideBarProps {
    backgroundImage?: string;
    profileId: string;
    boardTitle: string;
}

const RecordSideBar: React.FC<RecordSideBarProps> = ({
         backgroundImage,
         profileId,
         boardTitle }) => {
    const onSubmit = (data: Record<string, any>) => {
        console.log(data);
    }

    let categoryAmount : number = 0;

    return (
        <div className={styles.entireWrapper}>
            <div className={styles.profileWrapper}>
                <ProfileImage
                    backgroundImage={backgroundImage ? backgroundImage : undefined}
                    alt="profileImage"
                    width="100px"
                    height="100px"/>
                <div className={styles.profileId}>{profileId}</div>
                <BasicHr width="50%" borderWidth="0.5px" opacity={0.5}/>
                <div className={styles.boardTitle}>{boardTitle}</div>
            </div>
            <SimpleTextSearch width="200px" onSubmit={onSubmit} />
            <div className={styles.categoryWrapper}>
                <div className={styles.categoryTitle}>카테고리 ({categoryAmount})</div>
                <BasicHr width="100%" borderWidth="0.5px" opacity={0.5} />
                {

                }
            </div>
        </div>
    )
}

export default RecordSideBar;