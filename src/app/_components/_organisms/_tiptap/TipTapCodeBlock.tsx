import {NodeViewContent, NodeViewWrapper} from "@tiptap/react";
import 'highlight.js/styles/github.css'
import React from "react";

interface TipTapCodeBlockProps {
    node: {
        attrs: {
            language: string | null;
        };
    };
    updateAttributes: (attrs: { language: string | null }) => void;
    extension: {
        options: {
            lowlight: {
                listLanguages: () => string[];
            }
        }
    }
}

const TipTapCodeBlock: React.FC<TipTapCodeBlockProps> = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => {
    return (
        <NodeViewWrapper className="codeBlock">
            <select contentEditable={false} defaultValue={defaultLanguage ?? 'null'}
                    onChange={event => updateAttributes({language: event.target.value})}>
                <option value="null">
                    auto
                </option>
                <option disabled>
                    -
                </option>
                {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
                    <option key={index} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
            <pre>
                <NodeViewContent as="code"/>
            </pre>
        </NodeViewWrapper>
    )
}

export default TipTapCodeBlock;