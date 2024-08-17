"use client"

import React from "react";
import styles from "./ProfileImage.module.css"

interface CircleImageProps {
    backgroundImage?: string;
    alt: string;
    width: string;
    height: string;
}

const ProfileImage: React.FC<CircleImageProps> = ({ backgroundImage, width, height }) => {
    return (
        <div
            className={styles.profileImage}
            style={{
                backgroundImage: backgroundImage ? backgroundImage : `url("/assets/images/defaultProfile.png")`,
                width: width,
                height: height}}/>
    )
}

export default ProfileImage;