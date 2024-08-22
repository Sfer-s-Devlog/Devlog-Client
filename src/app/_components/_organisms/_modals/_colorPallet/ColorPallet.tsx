import styles from "./ColorPallet.module.css"
import ColorPalletButton from "@/app/_components/_atoms/_buttons/ColorPalletButton";
import React, {forwardRef} from "react";
import ReactDOM from "react-dom";

interface ColorPalletProps {
    onColorUnset: () => void,
    onColorSelect: (color: string) => void,
    position: {
        top: number,
        left: number,
    }
}

const ColorPallet = forwardRef<HTMLDivElement, ColorPalletProps>(({onColorUnset, onColorSelect, position}, ref) => {
    const colors = [
        "#000000", "#333333", "#666666", "#9D9D9D", "#DDDDDD", "#FFFFFF",
        "#EE2323", "#F89009", "#F3C000", "#009A87", "#006DD7", "#8A3DB6", "#7E98B1",
        "#FFC1C8", "#FFC9AF", "#F6E199", "#9FEEC3", "#99CEFA", "#C1BEF9", "#C0D1E7",
        "#EF5369", "#EF6F53", "#A6BC00", "#409D00", "#0593D3", "#6164C6", "#8CB3BE",
        "#781B33", "#953B34", "#5F6D2B", "#1B711D", "#1A5490", "#5733B1", "#456771"];

    return ReactDOM.createPortal(
        <div
            className={styles.entireWrapper}
            style={{top: position.top, left: position.left}}
            ref={ref}>
            <div className={styles.palletGrid}>
                <ColorPalletButton key={0} colorCode="none" onClick={onColorUnset}/>
                {colors.map((color, index) => (
                    <ColorPalletButton key={index + 1} colorCode={color} onClick={() => onColorSelect(color)}/>
                ))}
            </div>
        </div>, document.body);
})

export default ColorPallet;