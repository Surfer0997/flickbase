
//// wysiwyg
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/// edit
import htmlToDraft from 'html-to-draftjs'
import { useEffect, useState } from 'react';
import { HTMLDecode } from './tools';

const WYSIWYG = (props) => {
    const [editorData, setEditorData] = useState({
        editorState: EditorState.createEmpty()
    })

    const handleEditorChange = (editorData) => {
        // WYSIWYG returns data in object format, we want to work with is as html -> -> ->
        const HTMLData = stateToHTML(editorData.getCurrentContent());

        setEditorData({
            editorState: editorData
        })
        props.setEditorState(HTMLData);
    }

    const checkForError = () => {
        if (props.onError || (props.onError && props.editorBlur)) {
            return true;
        }
        return false;
    }

    useEffect(()=>{
         if (props.editorContent) {
            console.log(props.editorContent);
            console.log(HTMLDecode(props.editorContent));
            const blockFromHtml = htmlToDraft(HTMLDecode(props.editorContent)); // HTMLDecode(props.editorContent)
        console.log(blockFromHtml);
            const {contentBlocks, entityMap} = blockFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks,entityMap);

            setEditorData({
                editorState: EditorState.createWithContent(contentState)
            })
         }
    }, [props.editorContent])

    return (
        <div>
            <Editor
                editorState={editorData.editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName={`demo-wrapper ${checkForError()? 'error' : ''}`}
                editorClassName={`demo-editor`}
                onBlur={props.setEditorBlur}
            />

        </div>
    )
}

export default WYSIWYG;