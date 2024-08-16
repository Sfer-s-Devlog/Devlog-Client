"use client"

import {useForm} from "react-hook-form";
import React, {useRef} from "react";
import styles from "./SimpleTextSearch.module.css"
import TextInput from "@/app/_components/_atoms/_inputs/TextInput";
import SubmitButton from "@/app/_components/_atoms/_buttons/SubmitButton";

interface SimpleTextSearchProps {
    onSubmit: (data: Record<string, any>) => void;
}

const SimpleTextSearch: React.FC<SimpleTextSearchProps> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    const formRef = useRef<HTMLFormElement | null>(null);

    const onClick = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <div className={styles.entireWrapper}>
            <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                style={{width: "230px"}}>
                <TextInput
                    name="keyword"
                    register={register}
                    required={true}/>
            </form>
            <SubmitButton
                backgroundImage="/assets/icons/search.svg"
                onClick={onClick}/>
        </div>
    )
}

export default SimpleTextSearch;