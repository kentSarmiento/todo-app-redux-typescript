import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodoAsync,
  fetchTodoAsync
} from './todoSlice';
import styles from './Todo.module.css';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export function Todo() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    dispatch(fetchTodoAsync());
  }, [dispatch]);

  const handleCheckboxClick = () => {
    console.log("checkbox clicked...")
    //dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    console.log("delete clicked...")
    // dispatch(deleteTodoAsync({ id }));
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
                  onClick={handleCheckboxClick}
                ></input>
                {todo.name}
              </div>
              <div className={styles.separator}></div>
              <div>
                <button onClick={handleDeleteClick} className={styles.button}>
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
