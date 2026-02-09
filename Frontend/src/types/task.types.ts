export interface Task  {
    id:string,
    todoName:string,
    description:string,
    status:"pending" | "completed" | "canceled"
}


export interface taskState {
    tasks :Task[],
    isLoading:boolean,
    error:string | null
}