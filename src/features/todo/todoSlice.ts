import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTodoAPI, fetchTodoAPI } from './todoAPI';

export interface TodoState {
  id: string,
  name: string,
  isComplete: boolean
}

interface TodoListState {
  todos: TodoState[]
}

export const addTodoAsync = createAsyncThunk(
  'todo/addTodoAsync',
  async (name: string) => {
    const response = await addTodoAPI(name);
    return response;
  }
);

export const fetchTodoAsync = createAsyncThunk(
  'todo/fetchTodoAsync',
  async () => {
    const response = await fetchTodoAPI();
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
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.todos.push(action.payload);
    })
    builder.addCase(fetchTodoAsync.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.todos = action.payload;
    })
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
