export interface ITodo {
  id: string;
  userId: string;
  senderName:string;
  todoName: string;
  description?: string;
  status: "pending" | "completed" | "canceled";
  sharedWith?: Array<{
    userId: string;
    email: string;
    sharedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTodoBody {
  todoName: string;
  description?: string;
}

export interface IUpdatedTodoBody {
  todoName?: string;
  description?: string;
}
