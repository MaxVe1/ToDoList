import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import  AddItemForm from './AddItemForm';

type TodoListType = {
    id:string,
    title:string,
    filter:FilterValuesType
}
export type FilterValuesType = "all"|"active"|"completed";
export type TaskStateType = {[todoListsID : string]:Array<TaskType>}
function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks,setTasks] = useState<TaskStateType> ({
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


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }

    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];

        let task: TaskType | undefined = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    function addTodoList(title: string){
        const newTodoListID = v1()
        const newTodoList: TodoListType  = {
            id: newTodoListID,title: title, filter:'all'
        }
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks,[newTodoListID]:[]})
    }
    function changeTodoListTitle(title: string, todolistId: string){
          const todoList = todolists.find(tl=>tl.id === todolistId)
        if(todoList){
            todoList.title = title
            setTodolists([...todolists])
        }
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <TodoList
                        key={tl.id}
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
                })
            }

        </div>
    );
}

export default App;
