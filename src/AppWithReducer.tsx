import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import  AddItemForm from './AddItemForm';
import { AppBar, Button, IconButton, Typography, Toolbar, Container, Grid ,Paper} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';


export type TodoListType = {
    id:string,
    title:string,
    filter:FilterValuesType
}
export type FilterValuesType = "all"|"active"|"completed";
export type TaskStateType = {[todoListsID : string]:Array<TaskType>}
function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks,dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}],
        [todolistId2 ]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Meat', isDone: false}
        ]
    })

// funcs for tasks
    function removeTask(id: string, todolistId: string) {
       let action = removeTaskAC(id,todolistId)
       dispatchToTasks(action)
    }
    function addTask(title: string, todolistId: string) {
         dispatchToTasks(addTaskAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
         dispatchToTasks(changeTaskStatusAC(id,isDone,todolistId))
    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id,title,todolistId))
    }
// funcs fot todolist
    function changeFilter(value: FilterValuesType, todolistId: string) {
         dispatchToTodolists(ChangeTodolistFilterAC(todolistId,value))
    }
    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function addTodoList(title: string){
        let action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function changeTodoListTitle(title: string, todolistId: string){
        dispatchToTodolists(ChangeTodolistTitleAC(title,todolistId))
    }

    const listTodos =    todolists.map(tl => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
        }
        return(
        <Grid item key={tl.id}>
        <Paper elevation={10} style={{padding: "20px"}}>
        <TodoList
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
        />
        </Paper>
        </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {listTodos}
                </Grid>
            </Container>
            {

            }

        </div>
    );
}

export default App;
