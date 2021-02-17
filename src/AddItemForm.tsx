import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string)=> void
}

export default function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addItem();
        }
    }
    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={changeTitle }
                onKeyPress={onKeyPressAddTask }
                onBlur={()=>{setError(false)}}
                helperText={error ? "Title is required" : ""}
                label={"Title"}
                error={error}
            />

            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
}