import React, { useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import {
  addTodoAsync,
} from '../features/todo/todoSlice';
import styles from './Todo.module.css';

export function TodoInput() {
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState('');

  const handleAddClick= () => {
    dispatch(addTodoAsync(taskName));
    setTaskName('');
  };

  return (
    <div className={styles.row}>
        <input
            className={styles.textbox}
            aria-label="Set task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
        />
        <button
            className={styles.button}
            onClick={handleAddClick}
        >
            Add Task
        </button>
    </div>
  );
}
