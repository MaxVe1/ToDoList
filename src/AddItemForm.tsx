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
            <input value={title}
                   onChange={changeTitle }
                   onKeyPress={onKeyPressAddTask }
                   className={error ? "error" : ""}
                   onBlur={()=>{setError(false)}}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">'Title is required'</div>}
        </div>
    );
}