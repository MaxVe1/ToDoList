import React, { useState,ChangeEvent,KeyboardEvent  } from "react";
import {TaskType, FilterValuesType} from "./App";

type TodoListPropsType = {
     title:string
     tasks: Array<TaskType>
     filter:FilterValuesType
     addTask:(taskTitle: string) => void
     removeTask: (taskID: string) => void
    changeStatus:(taskID:string, isDone:boolean)=> void
     changeFilter: (newFilterValue: FilterValuesType)=>void
}

function TodoList (props:TodoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const all = () => {props.changeFilter("all")}
    const active = () => {props.changeFilter("active")}
    const completed = () => {props.changeFilter("completed")}

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
        props.addTask(trimmedTitle)
                          setTitle("")
        }else{
            setError("Title is required!")
        }
        setTitle("")

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKEyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key==="Enter") addTask()
    }
    const tasks=props.tasks.map(t => {
        const removeTask = () => {props.removeTask(t.id)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>{
             props.changeStatus(t.id,e.currentTarget.checked)
        }
        /*let errorText = error ?*/

        return(
            <li key={t.id}  className={t.isDone ? "is-done": ""}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}

                />
                <span>{t.title}</span>
                <button onClick= {removeTask} >x</button>

            </li>
        )})

    return <div>
        <h3>{props.title}</h3>

        <input
            value={title}
            onChange={(e)=>{setTitle(e.currentTarget.value)}}
            onKeyPress={(e)=> {if(e.key==="Enter") addTask()}}
            className ={error ? 'error': ''}
            onBlur={ ()=>{setError(null)}}
        />
        <button onClick = {addTask}>+</button>
        {error&&<div className={'error-message'}>{error}</div>}
        <ul>
            {tasks}

            {/*<li>*/}
            {/*    <input type="checkbox" checked={props.tasks[1].isDone}/>*/}
            {/*    <span>{props.tasks[1].title}</span>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <input type="checkbox" checked={props.tasks[2].isDone}/> */}
            {/*    <span>{props.tasks[2].title}</span>*/}
            {/*</li>*/}
        </ul>
        <div>
            <button
                className={props.filter==="all"?"active-filter":""}
                onClick={all}>All</button>
            <button
                className={props.filter==="active"?"active-filter":""}
                onClick={active}>Active</button>
            <button
                className={props.filter==="completed"?"active-filter":""}
                onClick={completed}>Completed</button>
        </div>
    </div>
}

export default TodoList;
