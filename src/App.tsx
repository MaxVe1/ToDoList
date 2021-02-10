import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import {type} from "os";
import { v1 } from 'uuid';

 export type TaskType = {
    id: string
    title:string
    isDone: boolean
}

export type FilterValuesType = "all"|"active"|"completed";

function App() {
     let array = useState<Array<TaskType>> (  [
         {id: v1(), title:'JS', isDone: true},
         {id: v1(), title:'CSS', isDone: true},
         {id: v1(), title:'React', isDone: false},
         {id: v1(), title:'Redux', isDone: false},

     ])
     const tasks = array[0];//state
     const setTasks = array[1];//function

    const [filter, setFilter ]= useState<FilterValuesType>("all")


    function removeTask(taskID: string){
         let newState = tasks.filter(t=> t.id !== taskID)
         setTasks(newState)

    }
    function changeFilter(newFilterValue:FilterValuesType){
        setFilter(newFilterValue)
    }
    function addTask(taskTitle: string){
       /* const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const upDatedTasks = [newTask, ...tasks]
        setTasks(upDatedTasks)*/
        setTasks( [{
            id: v1(),
            title: taskTitle,
            isDone: false
        }, ...tasks])
    }

    function changeStatus(taskID: string, isDone: boolean){
        /*const task: TaskType|undefined = tasks.find(t=>t.id === taskID)
        //false - undef, null , 0,-0, "", NaN
        if(task){
             task.isDone = isDone
             setTasks([...tasks])

        }*/
        const newTasks= tasks.map(t=>{
            if(t.id===taskID){
                return {...t, isDone:isDone}
            }else {
                return t
            }
        })
        setTasks(newTasks)
    }
    let tasksForTodoList = tasks;
    if(filter==="active"){
        tasksForTodoList = tasks.filter(t=>t.isDone===false)
    }
    if(filter==="completed"){
        tasksForTodoList = tasks.filter(t=>t.isDone===true);
    }




    return (
        <div className="App">
            <TodoList  title={"What to learn"}
                       tasks = {tasksForTodoList}
                       filter={filter}
                       addTask = {addTask}
                       removeTask={removeTask}
                       changeStatus={changeStatus}
                       changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
