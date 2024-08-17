import React from "react";

interface BasicHrProps {
    width: string,
    borderWidth: string,
    opacity: number
}

const BasicHr: React.FC<BasicHrProps> = ({ width, borderWidth, opacity }) => {

    return (
        <hr style={{
            width: width,
            borderWidth: borderWidth,
            opacity: opacity}} />
    )
}

export default BasicHr;