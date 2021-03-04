import {FilterValuesType, TodoListType, TaskStateType} from '../App';
import {v1} from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string,
    todolistId:string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string,
    isDone:boolean,
    todolistId:string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskId: string,
    title:string,
    todolistId:string
}
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
export const tasksReducer = (state: TaskStateType, action: ActionsType):Array<TodoListType>=>{
     switch(action.type) {
         case 'REMOVE-TASK':{
             let copyState = {...state}
             //достанем нужный массив по todolistId:
             let todolistTasks = copyState[action.todolistId];
             // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
             copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);
             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой

             return copyState;
         }
         case 'ADD-TASK':{
             let copyState= {...state}
             let task = {id: v1(), title: action.title, isDone: false};
             //достанем нужный массив по todolistId:
             let todolistTasks = copyState[action.todolistId];
             // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
             copyState[action.todolistId] = [task, ...todolistTasks];
             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
              return copyState;
         }
         case 'CHANGE-STATUS-TASK':{
             let copyState= {...state}
             let todolistTasks = copyState[action.todolistId];
             // найдём нужную таску:
             let task = todolistTasks.find(t => t.id === action.taskId);
             //изменим таску, если она нашлась
             if (task) {
                 task.isDone = action.isDone;
                 // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
             }
             return copyState;
         }

         case 'CHANGE-TITLE-TASK':{
             let copyState= {...state}
             let todolistTasks = copyState[action.todolistId];
             // найдём нужную таску:
             let task = todolistTasks.find(t => t.id === action.taskId);
             //изменим таску, если она нашлась
             if (task) {
                 task.title = action.title;
                 // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
             }
             return copyState;
         }
         case 'ADD-TODOLIST':{
             return {
                 ...state,
                 [action.todolistId]: []
             }
         }
         case 'REMOVE-TODOLIST':{
             let copyState = {...state}
             delete copyState[action.id]
             return copyState
         }
         default:
             throw new Error("I don't understand this type")
     }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type:'REMOVE-TASK', taskId,todolistId}
}
export const addTaskAC = (title:string, todolistId:string): AddTaskActionType=> {
    return { type:'ADD-TASK', title,todolistId}
}
export const changeTaskStatusAC = (taskId:string,isDone:boolean, todolistId:string): ChangeTaskTitleActionType=> {
    return { type:'CHANGE-STATUS-TASK',taskId,isDone,todolistId}
}
export const changeTaskTitleAC = (taskId:string,title:string, todolistId:string): ChangeTaskTitleActionType=> {
    return { type:'CHANGE-TITLE-TASK',taskId,title,todolistId}
}