import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchTodoAsync,
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
  TodoState
} from './todoSlice';
import styles from './Todo.module.css';

export function Todo() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todos);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    dispatch(fetchTodoAsync());
  }, [dispatch]);

  const handleCheckboxClick = (todo: TodoState) => {
    let updatedTodo: TodoState = {
      id: todo.id,
      name: todo.name,
      isComplete: !todo.isComplete,
    }
    dispatch(updateTodoAsync(updatedTodo));
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <div>

      <ul className={styles.list}>
        {todoState.todos.map((todo) => (
          <li className={styles.row}>
              <div>
                <input
                  type='checkbox'
                  className='mr-3'
                  checked={todo.isComplete}
                  onClick={() => handleCheckboxClick(todo)}
                ></input>
                {todo.name}
              </div>
              <div className={styles.separator}></div>
              <div>
                <button
                  className={styles.button}
                  onClick={() => handleDeleteClick(todo.id)}>
                  Delete
                </button>
              </div>
          </li>
        ))}
      </ul>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(addTodoAsync(taskName))}
        >
          Add Task
        </button>
      </div>

    </div>
  );
}
