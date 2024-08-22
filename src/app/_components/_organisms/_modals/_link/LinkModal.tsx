import {useForm} from "react-hook-form";
import React, {forwardRef, useRef} from "react";
import styles from "./LinkModal.module.css"
import TextInput from "@/app/_components/_atoms/_inputs/TextInput";
import ReactDOM from "react-dom";
import TextButton from "@/app/_components/_atoms/_buttons/TextButton";

interface LinkModalProps {
    submitUrl: (data: Record<string, any>) => void,
    unsetUrl: () => void,
    position: {
        top: number,
        left: number
    },
    previousUrl: string
}

const LinkModal = forwardRef<HTMLDivElement, LinkModalProps>(({ submitUrl, position, previousUrl, unsetUrl }, ref) => {
    const {register, handleSubmit} = useForm();
    const formRef = useRef<HTMLFormElement | null>(null);

    const onClick = () => {
            handleSubmit(submitUrl)();
    }


    return ReactDOM.createPortal(
        <div
            className={styles.entireWrapper}
            style={{top: position.top, left: position.left}}
            ref={ref}>
            <div className={styles.inputWrapper}>
                <form
                    style={{width: "100%"}}
                    ref={formRef}
                    onSubmit={handleSubmit(submitUrl)}>
                    <TextInput
                        name="url"
                        placeholder="URL"
                        url={previousUrl}
                        register={register}
                        required={false}/>
                </form>
            </div>
            <div className={styles.buttonWrapper}>
                {
                    previousUrl && (
                        <TextButton type="button" children="초기화" onClick={unsetUrl}/>
                    )
                }
                <TextButton
                    type="submit"
                    children="확인"
                    fontColor="white"
                    backgroundColor="black"
                    onClick={onClick} />
            </div>
        </div>, document.body);
})

export default LinkModal;