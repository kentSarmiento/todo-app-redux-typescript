import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  fetchTodoAsync,
} from '../features/todo/todoSlice';
import styles from './Todo.module.css';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoAsync());
  }, [dispatch]);

  return (
      <ul className={styles.list}>
        {todoState.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem id={todo.id} name={todo.name} isComplete={todo.isComplete} />
          </li>
        ))}
      </ul>
  );
}
