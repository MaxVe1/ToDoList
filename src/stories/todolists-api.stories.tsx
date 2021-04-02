import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '28ba0792-3a26-4118-bfdb-e7b65046fc4e'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'react';
        todolistAPI.createTodo(title).then((res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c7f8c0fc-e810-4ccf-8c5d-2c81091bda95';
        todolistAPI.deleteTodo(todolistId).then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "VUE"
        const todolistId = 'c7f8c0fc-e810-4ccf-8c5d-2c81091bda95'
        todolistAPI.updateTodo(title,todolistId)
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}




