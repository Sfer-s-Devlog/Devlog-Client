import styles from "./RecordTextEditor.module.css"
import React, {useEffect, useState} from 'react'
import {Editor, EditorState, RichUtils, DraftEditorCommand, DraftHandleValue} from 'draft-js'
import 'draft-js/dist/Draft.css'

const RecordTextEditor = () => {

    useEffect(() => {
        const initialState = EditorState.createEmpty();
        setEditorState(initialState);
    }, []);

    const [editorState, setEditorState] = useState<EditorState | null>(null);

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
                />
            </div>

        </>
    )

}

export default RecordTextEditor;