import styles from "./RecordTextEditor.module.css"
import React, {useEffect, useState} from 'react'
import {Editor, EditorState, RichUtils, DraftEditorCommand, DraftHandleValue, KeyBindingUtil, getDefaultKeyBinding} from 'draft-js'
import 'draft-js/dist/Draft.css'

const RecordTextEditor = () => {

    useEffect(() => {
        const initialState = EditorState.createEmpty();
        setEditorState(initialState);
    }, []);

    const [editorState, setEditorState] = useState<EditorState | null>(null);

    const keyBindingFn = (e: React.KeyboardEvent): DraftEditorCommand | null => {
        if(e.key === 'b' && KeyBindingUtil.hasCommandModifier(e)) {
            return 'bold';
        }
        if(e.key === 'i' && KeyBindingUtil.hasCommandModifier(e)) {
            return 'italic';
        }
        return getDefaultKeyBinding(e);
    }

    const hashKeyCommand = (
        command: DraftEditorCommand,
        editorState: EditorState
    ): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    if(!editorState) {
        return null;
    }

    return (
        <>
            <div className={styles.editorWrapper}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={hashKeyCommand}
                    keyBindingFn={keyBindingFn}
                />
            </div>

        </>
    )

}

export default RecordTextEditor;