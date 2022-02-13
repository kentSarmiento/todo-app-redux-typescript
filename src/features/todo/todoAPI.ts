import { TodoState } from "./todoSlice";

export const addTodoAPI = async (payload: string): Promise<TodoState | undefined> => {
  const response = await fetch('http://localhost:5000/api/todoitems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: payload, completed: false}),
  });

  if (response.ok) {
    const todo: TodoState = await response.json();
    return todo;
  }
}

export const fetchTodoAPI = async (): Promise<TodoState[] | undefined> => {
  const response = await fetch('http://localhost:5000/api/todoitems');

  if (response.ok) {
    const todo: TodoState[] = await response.json();
    return todo;
  }
}