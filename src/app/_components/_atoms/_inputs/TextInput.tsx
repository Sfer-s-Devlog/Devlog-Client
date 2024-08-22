import {UseFormRegister} from "react-hook-form";
import React from "react";
import styles from "./TextInput.module.css"

interface SearchInputProps {
    name: string;
    register: UseFormRegister<any>;
    required?: boolean;
    placeholder?: string;
    url?: string;
}

const TextInput: React.FC<SearchInputProps> = ({placeholder = "", name, register, required, url}) => {

    return (
        <input
            className={styles.textInput}
            type="text"
            defaultValue={url}
            placeholder={`${placeholder}`}
            {...register(name, { required })} />
    )
}

export default TextInput;