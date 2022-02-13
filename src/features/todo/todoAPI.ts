import { TodoState } from "./todoSlice";

export const fetchTodoAPI = async (): Promise<TodoState[] | undefined> => {
  const response = await fetch('http://localhost:5000/api/todoitems');

  if (response.ok) {
    const todo: TodoState[] = await response.json();
    return todo;
  }
}

export const addTodoAPI = async (name: string): Promise<TodoState | undefined> => {
  const response = await fetch('http://localhost:5000/api/todoitems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, isComplete: false}),
  });

  if (response.ok) {
    const todo: TodoState = await response.json();
    return todo;
  }
}

export const updateTodoAPI = async (todo: TodoState): Promise<TodoState | undefined> => {
  const response = await fetch(`http://localhost:5000/api/todoitems/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo)
  });

  if (response.ok) {
    return todo;
  }
}

export const deleteTodoAPI = async (id: string): Promise<string | undefined> => {
  const response = await fetch(`http://localhost:5000/api/todoitems/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    return id;
  }
}
