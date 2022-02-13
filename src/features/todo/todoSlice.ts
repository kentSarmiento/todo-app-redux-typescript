import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTodoAPI,
  addTodoAPI,
  updateTodoAPI,
  deleteTodoAPI
} from './todoAPI';

export interface TodoState {
  id: string,
  name: string,
  isComplete: boolean
}

interface TodoListState {
  todos: TodoState[]
}

export const fetchTodoAsync = createAsyncThunk(
  'todo/fetchTodoAsync',
  async () => {
    const response = await fetchTodoAPI();
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todo/addTodoAsync',
  async (name: string) => {
    const response = await addTodoAPI(name);
    return response;
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todo/updateTodoAsync',
  async (todo: TodoState) => {
    const response = await updateTodoAPI(todo);
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteTodoAsync',
  async (id: string) => {
    const response = await deleteTodoAPI(id);
    return response;
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: []
  } as TodoListState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoState>) => {
      const todo: TodoState = {
        id: Date.now().toString(),
        name: action.payload.name,
        isComplete: false,
      };
      state.todos.push(todo);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.todos = action.payload;
    })
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.todos.push(action.payload);
    })
    builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const index = state.todos.findIndex(
          (todo) => action.payload !== undefined && todo.id === action.payload.id
        );
        state.todos[index].isComplete = action.payload.isComplete
      }
    })
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    })
  },
});

export default todoSlice.reducer;
