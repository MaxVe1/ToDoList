import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import  AddItemForm from './AddItemForm';
import  EditableSpan from './EditableSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle:(title: string, todolistId: string)=> void
}

export function TodoList(props: PropsType) {
    const addTask = (title:string)=> {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title:string)=>props.changeTodoListTitle(title,props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const all = () => props.changeFilter("all", props.id);
    const active = () => props.changeFilter("active", props.id);
    const completed = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
           {/* <button onClick={removeTodolist}>x</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: 'none',paddingLeft:'0'}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTitle=(title:string)=>{
                        props.changeTaskTitle(t.id,title,props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={"secondary"}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                         <EditableSpan title={t.title} changeItem={changeTitle }/>

                         <IconButton onClick={onClickHandler}>
                             <Delete/>
                         </IconButton>
                        </li>
                })
            }
        </ul>
        <div>
            <Button
                    color={props.filter=== "all"? "secondary" : "primary"}
                    variant={"contained"}
                    size={"small"}
                    className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={all}>All
            </Button>
            <Button
                    color={props.filter=== "active"? "secondary" : "primary"}
                    variant={"contained"}
                     size={"small"}
                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={active}>Active
            </Button>


            <Button
                color={props.filter=== "completed"? "secondary" : "primary"}
                variant={"contained"}
                size={"small"}
                //className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={completed}>Completed
            </Button>
        </div>
    </div>
}


