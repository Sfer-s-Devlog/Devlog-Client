import styles from "./HeadingModal.module.css"
import React, {forwardRef} from "react";
import ReactDOM from "react-dom";

interface HeadingModalProps {
    onHeadingSelect: (heading: 1 | 2 | 3 | 4 | 5 | 6) => void,
    position: {
        top: number,
        left: number
    }
}

const HeadingModal = forwardRef<HTMLDivElement, HeadingModalProps>(({onHeadingSelect, position}, ref) => {
    return ReactDOM.createPortal(
        <div
            className={styles.entireWrapper}
            style={{top: position.top, left: position.left}}
            ref={ref}>
            <div className={styles.headingButtonWrapper}>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "20px"}}
                    onClick={() => onHeadingSelect(1)}>
                    Heading 1
                </button>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "18px"}}
                    onClick={() => onHeadingSelect(2)}>
                    Heading 2
                </button>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "16px"}}
                    onClick={() => onHeadingSelect(3)}>
                    Heading 3
                </button>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "14px"}}
                    onClick={() => onHeadingSelect(4)}>
                    Heading 4
                </button>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "12px"}}
                    onClick={() => onHeadingSelect(5)}>
                    Heading 5
                </button>
                <button
                    className={styles.headingButton}
                    style={{fontSize: "11px"}}
                    onClick={() => onHeadingSelect(6)}>
                    Heading 6
                </button>
            </div>
        </div>, document.body);
})

export default HeadingModal;