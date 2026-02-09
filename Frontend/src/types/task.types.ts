export interface Task  {
    id:string,
    userId:string,
    senderName:string,
    todoName:string,
    description:string,
    status:"pending" | "completed" | "canceled"
}


export interface taskState {
    tasks :Task[],
    isLoading:boolean,
    error:string | null
}