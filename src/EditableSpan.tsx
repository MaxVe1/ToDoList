import { TextField } from '@material-ui/core';
import React, {useState,ChangeEvent} from 'react';
type EditableSpanPropsType = {
    title: string
    changeItem: (title:string)=>void
}
function EditableSpan(props:EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true);
    }
    const offEditMode = () => {
        setEditMode(false);
        props.changeItem(title)
    }

    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        //<span>{props.title}</span>)
        editMode
            ? <TextField
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
            />
            /*? <input
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
            />*/
            : <span onDoubleClick={onEditMode}>{props.title} </span>);
}


export default EditableSpan;