import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
    'API-KEY': '28ba0792-3a26-4118-bfdb-e7b65046fc4e'
}
})



export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
            /*.then((res) => (res.data))*/
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType}>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(title: string, todolistId:string) {
           return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string,
    addedDate:string,
    order: number,
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>,
    fieldsError: Array<string>
    data: T
}

type DeleteAndUpdateTodoResponseType = {
    resultCode: number
    messages: Array<string>,
    fieldsError: Array<string>
    data: {
        item: TodoType
    }
}
